import PageTitle from "@/components/PageTitle";
import {signIn, useSession} from "next-auth/react";
import Layout from "@/components/Layout";

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

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (session?.user) {
        return (
            <Layout user={session?.user}>
                <PageTitle>Certificados</PageTitle>
            </Layout>
        )
    }
}