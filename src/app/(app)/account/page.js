import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { userAgentFromString } from "next/server";
import PageButtonsForm from "@/components/forms/PageButtonsForm";

export default async function AccountPage({searchParams}) {

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const desiredUsername = searchParams?.desiredUsername;
     
    mongoose.connect(process.env.MONGO_URI);
    const page = await Page.findOne({owner: session?.user?.email});

    if(page) {
        return (
            <>
                <PageSettingsForm page={page} user={user} />
                <PageButtonsForm page={page} user={user}/>
            </>
        );
    }

    if(!session) {
        redirect('/');
    }

    return (
        <div>
            <UsernameForm desiredUsername={desiredUsername} />
        </div>
    );
}