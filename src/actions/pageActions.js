'use server';
import { Page } from "@/models/Page";
import mongoose from "mongoose";

export default async function savePageSettings({formData, user}) {
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    if(user) {
        const displayName = formData.get("displayName");
        const location = formData.get("location");
        const bio = formData.get("bio");
    
        await Page.updateOne({owner: user?.email}, {displayName, location, bio});
        return true;
    }
    
    return false;
}