import PageTitle from "@/components/PageTitle";
import {signIn, useSession} from "next-auth/react";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading/Loading";
import Card from "@/components/Card/Card";

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
                <div className="c-full">
                    <Card title={"Empleados destacados"}
                          subtitle={"Aquí se mostrarán los empleados que han tenido mejor desempeño."}>

                    </Card>
                </div>
                <div className="c-full grid-c-2-4 ">
                    <Card title={" Tipos de certificados"}
                          subtitle={"Aquí se mostrará el porcentaje de empleados que han tomado los diferentes tipos de certificaciones."}>

                    </Card>
                    <Card title={"Progreso de nuevas certificaciones al año"}
                          subtitle={"Aquí se visualiza el progreso de las certificaciones de cada mes a lo largo del año."}>

                    </Card>

                </div>
            </Layout>
        )
    }
}