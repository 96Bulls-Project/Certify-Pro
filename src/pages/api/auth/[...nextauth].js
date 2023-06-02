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
            session.accessToken = token.accessToken
            session.user = token.user
            return session
        },
        async jwt({token, user, account, profile, isNewUser}) {
            if (user) {
                token.accessToken = user._id;
                token.user = { email: user.email, name: user.username}
            }
            return token
        },
    },
    session: {
        jwt: true,
    },
    jwt: {
        secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    },
    pages: {
        signIn: '/login',
    }

}

export default NextAuth(authOptions)