import { GoogleProvider } from "next-auth/providers";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "src/libs/mongoClient";
import NextAuth from "next-auth/next";

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
};

const handler = NextAuth(authOptions);

handler.on("error", (error) => {
    console.error("NextAuth error:", error);
});

export { handler as GET, handler as POST}