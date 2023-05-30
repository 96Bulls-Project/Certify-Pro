import PageTitle from "@/components/PageTitle";
import {signIn, useSession} from "next-auth/react";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading/Loading";

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

    if (status === 'loading') {
        return <Loading />
    }

    if (session?.user) {
        return (
            <Layout user={session?.user} grid={"grid-r-1-3-6"}>
                <PageTitle>Dashboard</PageTitle>
                <div className="card c-full ">
                    <div className="p-5">
                        <div>
                            <p className={"font-bold text-gray-700"}>
                                Empleados destacados
                            </p>
                            <p className={"text-sm text-gray-500"}>
                                Aquí se mostrarán los empleados que han tenido mejor desempeño.
                            </p>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="c-full grid-c-2-4 ">
                    <div className={"card h-full"}>
                        <div className="p-5">
                            <div>
                                <p className={"font-bold text-gray-700 h-full"}>
                                    Tipos de certificados
                                </p>
                                <p className={"text-sm text-gray-500 "}>
                                    Aquí se mostrará el porcentaje de empleados que han tomado los diferentes tipos de
                                    certificaciones.

                                </p>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className={"card h-full"}>
                        <div className="p-5">
                            <div>
                                <p className={"font-bold text-gray-700"}>
                                    Progreso de nuevas certificaciones al año
                                </p>
                                <p className={"text-sm text-gray-500"}>
                                    Aquí se visualiza el progreso de las certificaciones de cada mes a lo largo del año.
                                </p>
                            </div>

                        </div>
                        <hr />
                    </div>
                </div>
            </Layout>
        )
    }
}