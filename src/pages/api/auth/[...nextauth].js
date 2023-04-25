import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials

                // TODO: Replace with Database Authentication
                if (email === "admin@gmail.com" && password === "admin") {
                    return { id: 1, name: "Admin"}
                }
                return null
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, user, token }) {
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        },
    },
    session: {
        jwt: true,
    },
    jwt: {
        // TODO: Replace with a secure secret in ENVIRONMENT VARIABLES
        secret: 'SECRET_REPLACE_ME'
    },
    pages:{
        signIn: '/login',
    }

}

export default NextAuth(authOptions)