import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import client from '../../../lib/mongodb'

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
                const {email, password} = credentials

                const dbClient = await client;
                const db = dbClient.db('Web');
                const collection = db.collection('Admins');

                // example to get a doc in collection
                return await collection.findOne(
                    {email: email, password: password},
                    {email: 1, username: 1, _id: 1}
                ).then((doc) => {
                    console.log('doc: ', doc)
                    if (!doc) {
                        return null
                    }
                    return doc;

                }).catch((err) =>
                    console.log('err: ', err)
                )
            }
        }),
    ],
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            return true
        },
        async redirect({url, baseUrl}) {
            return baseUrl
        },
        async session({session, user, token}) {
            return session
        },
        async jwt({token, user, account, profile, isNewUser}) {
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
    pages: {
        signIn: '/login',
    }

}

export default NextAuth(authOptions)