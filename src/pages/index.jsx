import {useSession, signIn, signOut} from "next-auth/react"
import React from "react";
import Layout from "@/components/Layout";

export default function Home() {
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

    console.log(session);
    if (session?.user) {
        return (
            <Layout user={session?.user}>
                <div>
                    Signed in as {JSON.stringify(session.user)} <br />
                </div>
            </Layout>
        )
    }


}
