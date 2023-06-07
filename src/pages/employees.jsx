import PageTitle from "@/components/PageTitle";
import {signIn, useSession} from "next-auth/react";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading/Loading";
import {useState, useEffect} from "react";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, Filler, LinearScale, LineElement, PointElement, Title} from "chart.js";
import {employees1, employees2} from "@/lib/mockData";
import Card from "@/components/Card/Card";


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

    const itemsPerPage = 5;

    const [isFetchingData, setIsFetchingData] = useState(true);
    const [topTeams, settopTeams] = useState([]);
    const [employees, setEmployees] = useState({});
    const [employeesItemsPages, setEmployeesItemsPages] = useState([]);

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

    const handlePagination = (page => {
        // Query the api to get the requested page...
        switch (page) {
            case 1:
                setEmployees(employees1);
                setEmployeesItemsPages([...Array(Math.ceil(employees1.total / itemsPerPage)).keys()]);
                break;

            case 2:
                setEmployees(employees2);
                setEmployeesItemsPages([...Array(Math.ceil(employees2.total / itemsPerPage)).keys()]);
                break;

            default:
                setEmployees(employees1);
                setEmployeesItemsPages([...Array(Math.ceil(employees1.total / itemsPerPage)).keys()]);
                break;
        }

    });

    useEffect(() => {
        const gettopTeams = async () => {
            // const response = await axios.get('https://certifyprogdl.azurewebsites.net/gettopTeams');
            // settopTeams(response.data);

            settopTeams([
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


            setEmployees(employees1);
            setEmployeesItemsPages([...Array(Math.ceil(employees1.total / itemsPerPage)).keys()]);
        }


        gettopTeams().then(() => setIsFetchingData(false));
    }, []);

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
                            <Line options={options} data={data} width={400} height={"160px"} />
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
                        <table className="table-auto w-full text-left">
                            <thead>
                            <tr>
                                <th className={""}></th>
                                {/* <th className={"text-sm text-gray-500 font-light w-8/12"}>Group</th> */}
                                <th className={"text-sm text-gray-500 font-light"}>Name</th>
                                <th className={"text-sm text-gray-500 font-light"}>Role</th>
                                <th className={"text-sm text-gray-500 font-light"}>Certificaciones</th>
                                <th className={"text-sm text-gray-500 font-light"}>Ubicación</th>
                                <th className={"text-sm text-gray-500 font-light"}>Info</th>
                            </tr>
                            </thead>

                            <tbody>


                            {employees.data?.map(emp => (

                                <tr className="my-4" key={emp.id}>
                                    <td>
                                        <div className="flex justify-center">
                                            <div className="rounded-full w-10 h-10 bg-slate-600"></div>
                                        </div>
                                        {emp.icon}
                                    </td>

                                    <td>
                                        {emp.name}
                                    </td>

                                    <td className="text-gray-500">
                                        {emp.role}
                                    </td>

                                    <td className="text-gray-500">
                                        {emp.numCertifications}
                                    </td>

                                    <td className="text-gray-500">
                                        {emp.location}
                                    </td>

                                    <td className="m-4">
                                        <button className="bg-blue-600 text-white px-2 py-1 rounded">Ver mas</button>
                                    </td>
                                </tr>
                            ))}
                            {/* <td></td>
                                    <td>Juan Escutia</td>
                                    <td>Employer</td>
                                    <td>5</td>
                                    <td>Zap, Jalisco</td>
                                    <td>
                                        <button className="bg-blue-600 text-white px-2 py-1 rounded">Ver mas</button>
                                    </td> */}


                            </tbody>
                        </table>

                        <hr />

                        <div className="p-5 text-center">
                            {employeesItemsPages.map(pageNum => (
                                <button className={`text-${pageNum + 1 === employees.page ? "blue" : "slate"}-600 px-2 py-1 rounded mx-2`}
                                        key={pageNum + 1}
                                        onClick={() => handlePagination(pageNum + 1)}>
                                    {pageNum + 1}
                                </button>
                            ))}

                        </div>

                    </Card>
                </div>
            </Layout>
        )
    }
}