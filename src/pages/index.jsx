import {useSession, signIn, signOut} from "next-auth/react"
import {useContext, useEffect, useState} from "react";
import Layout from "@/components/Layout";
import PageTitle from "../components/PageTitle";
import InfiniteScroll from "@/components/InfiniteScroll";
import {faker} from "@faker-js/faker";
import SummaryCard from "@/components/SummaryCard/SummaryCard";
import TopFiveCard from "@/components/TopCard/TopFiveCard";
import axios from "axios";
import Loading from "@/components/Loading/Loading";
import useSWR from "swr";
import {AppContext} from "@/context/AppProvider";

export default function Home() {
    const [isFetchingData, setIsFetchingData] = useState(true);

    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            signIn().then(r => {
                console.log(r);
                return r;
            });
        }
    });
    const [state, setState] = useContext(AppContext);

    const fetcher = (url) => axios(url).then((res) => {
        console.log(res)
        return res.data.data;
    });

    const {data: top5Employees, error: top5EmployeesError, top5EmployeesIsLoading} = useSWR('api/top5Employees', fetcher);
    const {data: top5Certificates, error: top5CertificatesError, top5CertificatesIsLoading} = useSWR('api/top5Certificates', fetcher);

    useEffect(() => {


        if (top5EmployeesIsLoading || top5CertificatesIsLoading) {
            setIsFetchingData(true);
        } else {
            setIsFetchingData(false);
        }
    }, [top5EmployeesIsLoading, top5CertificatesIsLoading])

    if (status === 'loading' || state.isFetchingData) {
        return <Loading />
    }

    const cardsTest = [
        {
            title: "Empleados",
            subtitle: "Cantidad de Empleados",
            data: [
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
            ],
            dataType: "mensual",
            dataOf: 'employees'
        },
        {
            title: "Certificados",
            subtitle: "Cantidad de Certificados",
            data: [
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
            ],
            dataType: "mensual",
            dataOf: 'certificates'
        },
        {
            title: "Empleados",
            subtitle: "Total de Empleados",
            data: [
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
                {value: faker.number.int({min: 0, max: 500})},
            ],
            dataType: "mensual",
            dataOf: 'employees'
        }
    ]

    if (session?.user) {
        return (
            <Layout user={session?.user} grid={'grid-r-1-1-4'}>
                <PageTitle>Bienvenid@ {session.user.name}</PageTitle>
                <InfiniteScroll>
                    {cardsTest.map((card, index) => (
                        <SummaryCard key={index} info={card} type={card.dataOf} loading={isFetchingData} />
                    ))}
                </InfiniteScroll>
                <div className="grid grid-cols-2 gap-8 c-full">
                    <TopFiveCard title={"Top 5 Empleados"}
                                 description={"Aquí se muestran los primero 5 empleados que cumplan con los criterios definidos en el filtro"}
                                 data={top5Employees}
                                 fieldsMap={{
                                 "title": "UserId",
                                 "subtitle": "WorkLocation",
                                 "value": "TotalCertifications"
                             }}
                                 loading={isFetchingData} />
                    <TopFiveCard title={"Top 5 Certificados"}
                                 description={"Aquí se muestran las primera 5 certificaciones que cumplen con los criterios definidos en el filtro"}
                                 data={top5Certificates}
                                 fieldsMap={{
                                 "title": "Name",
                                 "subtitle": "Skills",
                                 "value": "Type"
                             }}
                                 loading={isFetchingData} />
                </div>
            </Layout>
        )
    }


}
