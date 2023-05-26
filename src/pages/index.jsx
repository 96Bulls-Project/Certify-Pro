import {useSession, signIn, signOut} from "next-auth/react"
import {useEffect, useState} from "react";
import Layout from "@/components/Layout";
import PageTitle from "../components/PageTitle";
import InfiniteScroll from "@/components/InfiniteScroll";
import {faker} from "@faker-js/faker";
import SummaryCard from "@/components/SummaryCard/SummaryCard";
import TopCard from "@/components/TopCard/TopCard";
import axios from "axios";

export default function Home() {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            signIn().then(r => {
                console.log(r);
                return r;
            });
        }
    });

    const [top5Eployees, setTop5Employees] = useState([]);
    const [top5Certificates, setTop5Certificates] = useState([]);

    useEffect(() => {
        const getTop5Employees = async () => {
            const response = await axios.get('https://certifyprogdl.azurewebsites.net/getTop5Employees');
            console.log(response.data)
            setTop5Employees(response.data);
        }
        const getTop5Certificates = async () => {
            const response = await axios.get('https://certifyprogdl.azurewebsites.net/getTop5Certifications');
            console.log(response.data)
            setTop5Certificates(response.data);
        }
        getTop5Employees();
        getTop5Certificates();
    }, []);


    if (status === 'loading') {
        return <p>Loading...</p>
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
            <Layout user={session?.user}>
                <PageTitle>Bienvenid@ {session.user.name}</PageTitle>
                <InfiniteScroll>
                    {cardsTest.map((card, index) => (
                        <SummaryCard key={index} info={card} type={card.dataOf} />
                    ))}
                </InfiniteScroll>
                <div className="grid grid-cols-2 gap-8 c-full row-start-4">
                    <TopCard data={top5Eployees} fieldsMap={{
                        "title": "UserId",
                        "subtitle": "WorkLocation",
                        "value": "TotalCertifications"
                    }} />
                    <TopCard data={top5Certificates} fieldsMap={{
                        "title": "Name",
                        "subtitle": "Skills",
                        "value": "Type"
                    }}/>
                </div>
            </Layout>
        )
    }


}
