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
        console.log(res)
        const parsedData = JSON.parse(res.data.data);
        console.log(parsedData);
        return JSON.parse(res.data.data);
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

    const [itemOffset, setItemOffset] = useState(0);

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
    const itemsPerPage = 5

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = employees?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(employees?.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % employees?.length;
        setItemOffset(newOffset);
    };

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
                            <Line options={options} data={data} width={400} height={"145px"} />
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
                                    <div className="m-4">
                                        <button className="bg-blue-600 text-white px-2 py-1 rounded">Ver mas</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                </div>

                <div className="c-full">

                    <Card title={"Lista de empleados"}
                          subtitle={"Aquí se visualiza la lista con todos los empleados, asi como su status y roles."}>
                        <table className="table-auto w-full text-left mt-4">
                            <thead>
                            <tr>
                                <th className={""}></th>
                                <th className={"text-sm text-gray-500 font-light"}>Name</th>
                                <th className={"text-sm text-gray-500 font-light"}>Role</th>
                                <th className={"text-sm text-gray-500 font-light"}>Certificaciones</th>
                                <th className={"text-sm text-gray-500 font-light"}>Ubicación</th>
                                <th className={"text-sm text-gray-500 font-light"}>Info</th>
                            </tr>
                            </thead>

                            <tbody>
                            <PaginateItems dataToRender={currentItems} fieldsMap={{
                                icon: "",
                                first: "name",
                                second: "role",
                                third: "numCertifications",
                                fourth: "location",
                            }} />
                            </tbody>
                        </table>

                        <hr />

                        <div className="p-5 text-center">
                            <ReactPaginate
                                className="flex items-center justify-between w-1/2 m-auto"
                                pageCount={pageCount}
                                           nextLabel=">"
                                           previousLabel="<"
                                           renderOnZeroPageCount={null}
                                           onPageChange={handlePageClick}
                                           breakLabel="..."
                            />

                        </div>

                    </Card>
                </div>
            </Layout>
        )
    }
}