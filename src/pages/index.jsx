import {useSession, signIn, signOut} from "next-auth/react"

export default function Home() {
    const {data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            signIn().then(r => {
                console.log(r);
            });
        }
    });

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    console.log(session);
    if (session?.user) {
        return (
            <>
                Signed in as {JSON.stringify(session.user)} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }


}
