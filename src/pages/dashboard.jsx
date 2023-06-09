import PageTitle from "@/components/PageTitle";
import {signIn, useSession} from "next-auth/react";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading/Loading";
import Card from "@/components/Card/Card";
import {faker} from "@faker-js/faker";
import Image from "next/image";
import {Bar, Doughnut} from "react-chartjs-2";
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import useSWR from "swr";
import axios from "axios";
import {useEffect, useState} from "react";

ChartJS.register(
    ArcElement,
    Tooltip,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {
    // Check if user is authenticated
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            signIn().then(r => {
                console.log(r);
                return r;
            });
        }
    });

    const [isFetchingData, setIsFetchingData] = useState(true);

    const fetcher = (url) => axios(url).then((res) => {
        console.log(res)
        return res.data.data;
    });

    const {
        data: top5Certificates,
        error: top5CertificatesError,
        top5CertificatesIsLoading
    } = useSWR('api/top5Certificates', fetcher);

    const {
        data: certificationsObtainedComparison,
        error: certificationsObtainedComparisonError,
        certificationsObtainedComparisonIsLoading
    } = useSWR('api/certificationsObtainedComparison?year1=2021&year2=2022', fetcher);

    useEffect(() => {
        if (top5CertificatesIsLoading) {
            setIsFetchingData(true);
        } else {
            setIsFetchingData(false);
        }
    }, [top5CertificatesIsLoading])

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

    const doughnutData = {
        labels: top5Certificates?.map(cert => cert.Name),
        datasets: [{
            label: 'My First Dataset',
            data: top5Certificates?.map(cert => cert.CertifiedEmployees.length),
            backgroundColor: [
                '#48A0F8',
                '#3374B5',
                '#3A629E',
                '#2B4B78',
                '#12335F',
                '#0A234F'
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        responsive: false,
        plugins: {
            legend: {
                display: true,
                position: 'right'
            }
        },
        interaction: {
            intersect: true,
        },
    };


    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const historicalDataGraph = {
        labels,
        datasets: [
            {
                label: '2021',
                data: certificationsObtainedComparison?.year1,
                backgroundColor: '#3274B5',
            },
            {
                label: '2022',
                data: certificationsObtainedComparison?.year2,
                backgroundColor: '#48A0F8',
            },
        ],
    };

    const historicalOptionsGraph = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
            },
        },
    }

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
                                                    <Image src={"/icons/employees_summary_card.png"}
                                                           width={40}
                                                           height={40}
                                                           className={"mr-2"}  alt="employee-icon"/>
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
                          subtitle={"Aquí se mostrará el porcentaje de empleados que han tomado los diferentes tipos de certificaciones."}
                          footerTitle={"La certificacion más tomada es"}
                          footerSubtitle={top5Certificates?.length > 0 ? top5Certificates[0].Name : ""}>
                        <div className={"w-5/6 h-fit m-auto my-5"}>
                            <Doughnut data={doughnutData} options={options} />
                        </div>
                        <div className="w-5/6 m-auto">
                            <h4>Top 3</h4>
                            <ul className="pb-2">
                                {top5Certificates?.slice(0, 3)
                                    ?.map((cert, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="flex text-gray-500 border-b-2 border-b-gray-300 mb-3 ">
                                                    <p className="mr-5">{index + 1}.</p>
                                                    <p className={'text-xs'}>{cert.Name}</p>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </Card>
                    <Card title={"Certificaciones Obtenidas 2021 vs 2022"}
                          subtitle={"Aquí se visualiza el progreso de las certificaciones de cada mes a lo largo del año."}>
                        <div className={'px-5 pt-10'}>
                            <Bar data={historicalDataGraph} options={historicalOptionsGraph} />
                        </div>
                    </Card>
                </div>
            </Layout>
        )
    }
}