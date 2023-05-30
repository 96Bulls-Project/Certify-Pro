import PageTitle from "@/components/PageTitle";
import { signIn, useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading/Loading";
import { useState, useEffect } from "react";
import TopCard from "@/components/TopCard/TopCard";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS, Filler, LinearScale, LineElement, PointElement, Title } from "chart.js";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
);

export default function Employees() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            signIn().then(r => {
                console.log(r);
                return r;
            });
        }
    });

    const [isFetchingData, setIsFetchingData] = useState(true);
    const [top5Teams, setTop5Teams] = useState([]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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

    useEffect(() => {
        const getTop5Teams = async () => {
            // const response = await axios.get('https://certifyprogdl.azurewebsites.net/getTop5Teams');
            // setTop5Teams(response.data);

            setTop5Teams([
                {
                    "id": 1,
                    "name": "Omega Team",
                    "icon": "",
                    "date": "Jan 14, 2023"
                },
                {
                    "id": 2,
                    "name": "Alfa Team",
                    "icon": "",
                    "date": "Jan 14, 2023"
                },
                {
                    "id": 3,
                    "name": "Bravo Team",
                    "icon": "",
                    "date": "Jan 14, 2023"
                },
                {
                    "id": 4,
                    "name": "Charlie Team",
                    "icon": "",
                    "date": "Jan 14, 2023"
                }
            ]);
        }


        getTop5Teams().then(() => setIsFetchingData(false));
    }, []);

    if (status === 'loading') {
        return <Loading />
    }

    if (session?.user) {
        return (
            <Layout user={session?.user}>
                <PageTitle>Empleados</PageTitle>

                <div className="grid grid-cols-3 gap-8 c-full row-start-2">

                    <div className="h-auto card col-span-2">
                        <div className="p-5">
                            <div>
                                <p className={"font-bold text-gray-700"}>
                                    Rendimiento de empleados
                                </p>
                                <p className={"text-sm text-gray-500"}>
                                    Aquí se visualiza el rendimiento general de los empleados.
                                </p>
                            </div>
                        </div>
                        <hr />

                        <div className="h-400">
                            <Line options={options} data={data} width={"100%"} height={"340px"} />
                        </div>

                        <hr />

                        <div className="flex flex-row-reverse m-4">
                            <a href="#" className="text-gray-500">Expander &gt;</a>
                        </div>

                    </div>

                    <div className="card h-auto">
                        <div className="p-5">
                            <div>
                                <p className={"font-bold text-gray-700"}>
                                    Equipos destacados
                                </p>
                                <p className={"text-sm text-gray-500"}>
                                    Aquí se muestran los equipos con mayor cantidad de certificados así como de puntajes.
                                </p>
                            </div>
                        </div>
                        <hr />

                        <div className="">

                            {top5Teams.map(team => (
                                <div className="flex items-center justify-between" key={team.id}>
                                    <div className="flex items-center m-4">
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

                        <hr />

                        <div className="flex flex-row-reverse m-4">
                            <a href="#" className="text-gray-500">Expander &gt;</a>
                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 gap-8 c-full row-start-4 h-auto">

                    <div className="h-auto card col-span-2">
                        <div className="p-5">
                            <div>
                                <p className={"font-bold text-gray-700"}>
                                    Lista de empleados
                                </p>
                                <p className={"text-sm text-gray-500"}>
                                    Aquí se visualiza la lista con todos los empleados, asi como su status y roles.
                                </p>
                            </div>
                        </div>
                        <hr />

                        {/* <div className="h-400">
                            <Line options={options} data={data} width={"100%"} height={"340px"} />
                        </div>

                        <hr />

                        <div className="flex flex-row-reverse m-4">
                            <a href="#" className="text-gray-500">Expander &gt;</a>
                        </div> */}

                        {/* Table */}
                        <table className="table-auto w-full text-left">
                            <thead>
                                <tr>
                                    <th className={"text-sm text-gray-500 font-light w-8/12"}>Group</th>
                                    <th className={"text-sm text-gray-500 font-light"}>Status</th>
                                    <th className={"text-sm text-gray-500 font-light"}>Role</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>Juan Escutia</td>
                                    <td>
                                        <button className="bg-blue-600 text-white px-2 py-1 rounded">Ver mas</button>
                                    </td>
                                    <td>Employer</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        )
    }
}