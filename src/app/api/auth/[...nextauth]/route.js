import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoClient";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
}

const handler = nextAuth(authOptions);

export {handler as GET, handler as POST}