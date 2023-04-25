import '@/styles/globals.css'
import {IBM_Plex_Sans} from "@next/font/google";
import {SessionProvider} from "next-auth/react";

const ibmPlexSans = IBM_Plex_Sans({subsets: ["latin"], weight: ["400", "500", "600", "700"]});

export default function App(
    {
        Component,
        pageProps: {session, ...pageProps}
    }) {

    return (
        <>
            <style jsx global>{`
              html {
                font-family: ${ibmPlexSans.style.fontFamily};
              }
            `}</style>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </>
    )
}
