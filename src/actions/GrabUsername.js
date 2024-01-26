"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { AuthOptions, getServerSession } from "next-auth";

export default async function handleFormSubmit(formData) {
    const username = formData.get('userName');
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    const ifExists = await Page.findOne({uri: username});
    if(ifExists) {
        return false;
    }else {

        const session = await getServerSession(authOptions);
        const userEmail = session?.user?.email;

        return await Page.create({
            uri: username,
            owner: userEmail
        });
    }   
}