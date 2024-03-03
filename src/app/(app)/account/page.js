import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import cloneDeep from "clone-deep";


export default async function AccountPage({searchParams}) {

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const desiredUsername = searchParams?.desiredUsername;
     
    mongoose.connect(process.env.MONGO_URI);
    const page = await Page.findOne({owner: session?.user?.email});

    const leanPage = cloneDeep(page.toJSON());
    leanPage._id = leanPage._id.toString();


    if(page) {
        return (
            <>
                <PageSettingsForm page={leanPage} user={user} />
                <PageButtonsForm page={leanPage} user={user}/>
                <PageLinksForm page={leanPage} user={user}/>
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