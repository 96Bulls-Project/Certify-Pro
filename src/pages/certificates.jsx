import PageTitle from "@/components/PageTitle";
import {signIn, useSession} from "next-auth/react";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading/Loading";
import axios from "axios";
import {useEffect, useState} from "react";
import {faker} from "@faker-js/faker";
import Card from "@/components/Card/Card";
import {Line} from "react-chartjs-2";
import PaginateItems from "@/components/PaginateItems/PaginateItems";
import ReactPaginate from "react-paginate";
import OpenDetailsButton from "@/components/OpenDetailsButton/OpenDetailsButton";
import {CategoryScale, Chart as ChartJS, Filler, LinearScale, LineElement, PointElement, Title} from "chart.js";
import useSWR from "swr";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
);

export default function Certificates() {
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
    }).then((res) => {
        console.log(res.data)
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
    const {
        data: certificates,
        error: certificatesError,
        certificatesIsLoading
    } = useSWR('/api/certificates', fetcher);

    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);

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
                label: "certificates",
                fill: true,
                data: [7, 13, 39, 11],
                borderColor: '#0F62FE',
                backgroundColor: 'rgba(15, 98, 254, 0.1)',
                tension: 0.4,
                pointRadius: 0,
            }
        ],
    };

    const itemsPerPage = 5

    useEffect(() => {
        if (certificates) {
            const endOffset = itemOffset + itemsPerPage;
            console.log(certificates)
            setPageCount(Math.ceil(certificates?.length / itemsPerPage))
            setCurrentItems(certificates?.slice(itemOffset, endOffset));
            setIsFetchingData(false);
        }

    }, [certificates]);

    if (status === 'loading') {
        return <Loading />
    }

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % certificates?.length;
        setItemOffset(newOffset);
    };


    if (session?.user) {
        return (
            <Layout user={session?.user} grid={"grid-r-1-1-4"}>
                <PageTitle>Certificados</PageTitle>

                <div className="c-full grid-c-4-2 ">

                    <Card className="h-full"
                          title={"Cantidad de Certificaciones"}
                          subtitle={"Aquí se visualiza la cantidad total de certificaciones."}
                    >
                        <div className={"h-full w-full pt-8"}>
                            <Line id="certificates-graph" options={options} data={data} width={400} height={"145px"} />
                        </div>
                    </Card>

                    <Card className="h-full"
                          title={"Certificados destacados"}
                          subtitle={"Aquí se muestran los certificados con los que mas cuenta la empresa."}>
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

                    <Card title={"Lista de Certificados"}
                          subtitle={"Aquí se visualiza la lista con todos los certificados"}>
                        <table className="table-auto w-full text-left mt-4">
                            <thead>
                            <tr>
                                <th className={""}></th>
                                <th className={"text-sm text-gray-500 font-light"}>Name</th>
                                <th className={"text-sm text-gray-500 font-light"}>Type</th>
                                <th className={"text-sm text-gray-500 font-light"}>Certificaciones</th>

                            </tr>
                            </thead>

                            <tbody>
                            <PaginateItems dataToRender={currentItems} fieldsMap={{
                                icon: "",
                                first: "Name",
                                second: "Type",
                                third: null,
                                fourth: null,
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