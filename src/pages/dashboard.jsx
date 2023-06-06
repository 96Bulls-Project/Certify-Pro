import PageTitle from "@/components/PageTitle";
import {signIn, useSession} from "next-auth/react";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading/Loading";
import Card from "@/components/Card/Card";
import {faker} from "@faker-js/faker";
import Image from "next/image";
import {Doughnut} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";



export default function Dashboard() {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            signIn().then(r => {
                console.log(r);
                return r;
            });
        }
    });

    const doughnutData = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 250, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };



    const topData_Test = []


    for (let i = 0; i < 5; i++) {
        topData_Test.push({
            name: faker.person.fullName(),
            value: faker.number.int({min: 90, max: 100}),
            role: faker.person.jobTitle()
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
                          subtitle={"Aquí se mostrarán los empleados que han tenido mejor desempeño."}
                          className={"h-full"}>
                        <div className="flex flex-row items-center h-32 w-full overflow-scroll fill-height-space">
                            <div className="flex flex-row items-center">
                                {
                                    topData_Test?.map((item, index) => {
                                        return (
                                            <div key={index}
                                                 className="flex justify-between items-center h-full w-80 p-5">
                                                <div className="flex items-center">
                                                    <Image src={"/icons/employees_summary_card.png"} width={40} height={40} className={"mr-2"} />
                                                    <div className={'w-3/4'}>
                                                        <p className={'font-semibold'}>{item.name}</p>
                                                        <p className={'text-gray-500 text-sm'}>{item.role}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className={'text-blue-600 text-sm'}>{item.value} / 100</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="c-full grid-c-2-4 ">
                    <Card title={"Tipos de certificados"}
                          subtitle={"Aquí se mostrará el porcentaje de empleados que han tomado los diferentes tipos de certificaciones."}>
                        <Doughnut data={doughnutData} />

                    </Card>
                    <Card title={"Progreso de nuevas certificaciones al año"}
                          subtitle={"Aquí se visualiza el progreso de las certificaciones de cada mes a lo largo del año."}>

                    </Card>
                </div>
            </Layout>
        )
    }
}