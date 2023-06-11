import PageTitle from "@/components/PageTitle";
import {signIn, useSession} from "next-auth/react";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading/Loading";
import axios from "axios";
import {useState} from "react";
import Card from "@/components/Card/Card";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, Filler, LinearScale, LineElement, PointElement, Title} from "chart.js";
import useSWR from "swr";
import DetailsPopup from "@/components/DetailsPopup/DetailsPopup";
import PaginateTable from "@/components/PaginateTable/PaginateTable";

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
        return res.data.data;
    });

    const {
        data: certificates,
        error: certificatesError,
        certificatesIsLoading
    } = useSWR('/api/certificates', fetcher);

    const {
        data: top5CertificatesByCertificates,
        error: top5CertificatesByCertificatesError,
        top5CertificatesByCertificatesIsLoading
    } = useSWR('/api/top5SkillsByCertificates', fetcher);

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

    if (status === 'loading') {
        return <Loading />
    }

    if (session?.user) {
        return (
            <>
                <DetailsPopup />
                <Layout user={session?.user} grid={"grid-r-1-1-4"}>
                    <PageTitle>Certificados</PageTitle>

                    <div className="c-full grid-c-4-2 ">

                        <Card className="h-full"
                              title={"Cantidad de Certificaciones"}
                              subtitle={"Aquí se visualiza la cantidad total de certificaciones."}
                        >
                            <div className={"h-full w-full pt-8"}>
                                <Line id="certificates-graph"
                                      options={options}
                                      data={data}
                                      width={400}
                                      height={"145px"} />
                            </div>
                        </Card>

                        <Card className="h-full"
                              title={"Top Skills"}
                              subtitle={"Aquí se muestran las skills más desarrolladas de acuerdo a certificados realizados."}>
                            <div className="p-5">
                                {top5CertificatesByCertificates?.map((skill, i) => (
                                    <div className="flex items-center py-2" key={i + "-" + skill}>
                                        <p className={"text-gray-500 mr-3"}>{i + 1}.</p>
                                        <div className="flex items-center justify-between w-full">
                                            <p className={"text-xl  text-primary"}>
                                                {skill.name}
                                            </p>
                                            <p className="font-semibold text-gray-500">
                                                {skill.value}
                                            </p>

                                        </div>
                                        <hr/>
                                    </div>
                                ))}
                            </div>
                        </Card>

                    </div>

                    <div className="c-full">

                        <Card title={"Lista de Certificados"}
                              subtitle={"Aquí se visualiza la lista con todos los certificados"}>

                            <PaginateTable data={certificates}
                                           fieldsMap={{
                                               Name: "Name",
                                               Type: "Type",
                                           }}
                                           pageCount={5} />
                        </Card>
                    </div>
                </Layout>
            </>
        )
    }
}