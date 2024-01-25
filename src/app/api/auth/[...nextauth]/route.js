import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
}

const handler = nextAuth(authOptions);

export {handler as GET, handler as POST}