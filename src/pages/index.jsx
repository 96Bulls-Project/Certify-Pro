import {useSession, signIn, signOut} from "next-auth/react"
import {redirect} from "next/navigation";

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
                Signed in as {session.user.name} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }


}
