import PageTitle from "@/components/PageTitle";
import {signIn, useSession} from "next-auth/react";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading/Loading";
import {useState, useEffect} from "react";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, Filler, LinearScale, LineElement, PointElement, Title} from "chart.js";
import Card from "@/components/Card/Card";
import {faker} from "@faker-js/faker";
import axios from "axios";
import ReactPaginate from "react-paginate";
import PaginateItems from "@/components/PaginateItems/PaginateItems";
import useSWR from "swr";
import OpenDetailsButton from "@/components/OpenDetailsButton/OpenDetailsButton";
import PaginateTable from "@/components/PaginateTable/PaginateTable";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
);

export default function Employees() {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            signIn().then(r => {
                console.log(r);
                return r;
            });
        }
    });

    const fetcher = (url) => axios(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Server': 'gunicorn'
        }
    }).then((res) => {
        return res.data.data;
    });

    const [isFetchingData, setIsFetchingData] = useState(true);
    const [topTeams, settopTeams] = useState([
        {
            id: 1,
            name: "Team 1",
            numEmployees: 7,
            numCertifications: 13,

        },
        {
            id: 2,
            name: "Team 2",
            numEmployees: 15,
            numCertifications: 12,

        },
        {
            id: 3,
            name: "Team 3",
            numEmployees: 3,
            numCertifications: 6,

        },
        {
            id: 4,
            name: "Team 4",
            numEmployees: 6,
            numCertifications: 10,

        },
    ]);
    /*const {
        data: employees,
        error: employeesError,
        employeesIsLoading
    } = useSWR('/api/employees', fetcher);*/

    const employees = [];
    for (let i = 0; i < 100; i++) {
        employees.push({
            id: i,
            name: faker.person.firstName(),
            role: faker.person.jobArea(),
            location: faker.location.city(),
            numCertifications: faker.number.int(100),
        })
    }

    const options = {
        responsive: true,
        title: {
            display: false,
        },
        legend: {
            display: false,
        },
        interaction: {
            intersect: false,
            mode: false,
        },
        scales: {
            x: {
                ticks: {
                    display: false,
                },
                // to remove the x-axis grid
                grid: {
                    drawBorder: false,
                    display: false,
                },
                border: {
                    display: false,
                }
            },
            // to remove the y-axis labels
            y: {
                ticks: {
                    display: false,
                    beginAtZero: true,
                },
                // to remove the y-axis grid
                grid: {
                    drawBorder: false,
                    display: true,

                },
                border: {
                    display: false,
                }
            },
        }
    };

    const data = {
        labels: ["", "", "", ""],
        datasets: [
            {
                label: "employees",
                fill: true,
                data: [7, 13, 39, 11],
                borderColor: '#0F62FE',
                backgroundColor: 'rgba(15, 98, 254, 0.1)',
                tension: 0.4,
                pointRadius: 0,
            }
        ],
    };

    if (status === 'loading') {
        return <Loading />
    }

    if (session?.user) {
        return (
            <Layout user={session?.user} grid={"grid-r-1-1-4"}>
                <PageTitle>Empleados</PageTitle>

                <div className="c-full grid-c-4-2 ">

                    <Card className="h-full"
                          title={"Rendimiento de empleados"}
                          subtitle={"Aquí se visualiza el rendimiento general de los empleados."}
                    >
                        <div className={"h-full w-full pt-8"}>
                            <Line id="employees-graph" options={options} data={data} width={400} height={"145px"} />
                        </div>
                    </Card>

                    <Card className="h-full"
                          title={"Equipos destacados"}
                          subtitle={"Aquí se muestran los equipos con mayor cantidad de certificados así como de puntajes."}>
                        <div className="">
                            {topTeams?.map(team => (
                                <div className="flex items-center justify-between" key={team.id}>
                                    <div className="flex items-center m-4 mb-1">
                                        <div className="rounded-full w-10 h-10 bg-slate-600">
                                            {team.icon}
                                        </div>
                                        <div className="ml-4">
                                            <div>
                                                {team.name}
                                            </div>
                                            <div className="text-gray-500">
                                                {team.date}
                                            </div>
                                        </div>

                                    </div>
                                    <OpenDetailsButton />
                                </div>
                            ))}
                        </div>
                    </Card>

                </div>

                <div className="c-full">

                    <Card title={"Lista de empleados"}
                          subtitle={"Aquí se visualiza la lista con todos los empleados, asi como su status y roles."}>
                        <PaginateTable data={employees} fieldsMap={{
                            Name: "name",
                            Role: "role",
                            "Certificaciónes": "numCertifications",
                            "Ubicación": "location",
                        }}
                                       itemsPerPage={5} />
                    </Card>
                </div>
            </Layout>
        )
    }
}