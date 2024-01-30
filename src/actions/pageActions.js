'use server';
import { Page } from "@/models/Page";
import mongoose from "mongoose";

export default async function savePageSettings({formData, user}) {
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    if(user) {
        const dataKeys = [
            'displayName','location',
            'bio', 'bgType', 'bgColor', 'bgImage',
        ];
      
        const dataToUpdate = {};
            for (const key of dataKeys) {
                if (formData.has(key)) {
                dataToUpdate[key] = formData.get(key);
            }
        }
      
        await Page.updateOne(
            {owner:user?.email},
            dataToUpdate,
        );

        return true;
    }
    
    return false;
}