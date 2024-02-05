'use server';
import { Page } from "@/models/Page";
import User from "@/models/User";
import mongoose from "mongoose";

export default async function savePageSettings({formData, user}) {
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    if(user) {
        const dataKeys = [
            'displayName','location',
            'bio', 'bgType', 'bgColor', 'bgImage', 'avatar'
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

        if(formData.has('avatar')) {
            const avatarLink = formData.get('avatar');
            await User.updateOne(
                {email:user?.email},
                {image:avatarLink},
            );
        }

        return true;
    }
    
    return false;
}