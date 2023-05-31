import PageTitle from "@/components/PageTitle";
import {signIn, useSession} from "next-auth/react";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading/Loading";
import Card from "@/components/Card/Card";
import {faker} from "@faker-js/faker";
import {Doughnut} from "react-chartjs-2";

export default function Dashboard() {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            signIn().then(r => {
                console.log(r);
                return r;
            });
        }
    });

    const topData_Test = []


    for (let i = 0; i < 5; i++) {
        topData_Test.push({
            name: faker.person.fullName(),
            value: faker.number.int({min: 0, max: 100})
        })
    }


    if (status === 'loading') {
        return <Loading />
    }

    const data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    if (session?.user) {
        return (
            <Layout user={session?.user} grid={"grid-r-1-3-6"}>
                <PageTitle>Dashboard</PageTitle>
                <div className="c-full">
                    <Card title={"Empleados destacados"}
                          subtitle={"Aquí se mostrarán los empleados que han tenido mejor desempeño."} className={"h-full"}>
                        <div className="flex gap-10 w-fit overflow-x-scroll">
                            {

                                topData_Test?.map((item, index) => {
                                    return (
                                        <div key={index} className="flex justify-between items-center h-full w-96">
                                            <p>{item.name}</p>
                                            <p>{item.value}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Card>
                </div>
                <div className="c-full grid-c-2-4 ">
                    <Card title={"Tipos de certificados"}
                          subtitle={"Aquí se mostrará el porcentaje de empleados que han tomado los diferentes tipos de certificaciones."}>

                    </Card>
                    <Card title={"Progreso de nuevas certificaciones al año"}
                          subtitle={"Aquí se visualiza el progreso de las certificaciones de cada mes a lo largo del año."}>

                    </Card>
                </div>
            </Layout>
        )
    }
}