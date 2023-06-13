import PageTitle from "@/components/PageTitle";
import {signIn, useSession} from "next-auth/react";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading/Loading";
import axios from "axios";
import Card from "@/components/Card/Card";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, Filler, LinearScale, LineElement, PointElement, Title} from "chart.js";
import useSWR from "swr";
import PaginateTable from "@/components/PaginateTable/PaginateTable";
import {useContext} from "react";
import {AppContext} from "@/context/AppProvider";

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

    const [state, setState] = useContext(AppContext);

    const {
        data: top5CertificatesByCertificates,
        error: top5CertificatesByCertificatesError,
        top5CertificatesByCertificatesIsLoading
    } = useSWR('/api/top5SkillsByCertificates', fetcher);

    const {
        data: totalAccumulatedCertificates,
        error: totalAccumulatedCertificatesError,
        totalAccumulatedCertificatesIsLoading
    } = useSWR('api/certificationsObtainedComparison?year1=2022&year2=2023&accum=true', fetcher);

    const options = {
        responsive: true,
        title: {
            display: false,
        },
        legend: {
            display: true,
        },
        interaction: {
            intersect: true,
            mode: 'point'
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
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: "2022",
                fill: true,
                data: totalAccumulatedCertificates?.year1,
                borderColor: '#9ABAF5',
                backgroundColor: 'rgba(15, 98, 254, 0.1)',
                tension: 0.4,
                pointRadius: 0,
            },
            {
                label: "2023",
                fill: true,
                data: totalAccumulatedCertificates?.year2,
                borderColor: '#0F62FE',
                backgroundColor: 'rgba(15, 98, 254, 0.1)',
                tension: 0.4,
                pointRadius: 0,
            }
        ],
    };

    if (status === 'loading' || state.certificates.length === 0) {
        return <Loading />
    }

    if (session?.user) {
        return (
            <>
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
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </Card>

                    </div>

                    <div className="c-full">

                        <Card title={"Lista de Certificados"}
                              subtitle={"Aquí se visualiza la lista con todos los certificados"}>
                            <div className={"px-5"}>
                                <PaginateTable data={state?.certificates}
                                               fieldsMap={{
                                                   Name: "Name",
                                                   Type: "Type",
                                               }}
                                               pageCount={5}
                                               canOpenDetails={true}
                                               type={"certificates"} />
                            </div>
                        </Card>
                    </div>
                </Layout>
            </>
        )
    }
}