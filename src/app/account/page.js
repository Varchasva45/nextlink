import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import RightIcon from "@/components/icons/RightIcon";
import handleFormSubmit from "@/actions/GrabUsername";

export default async function AccountPage({searchParams}) {

    const session = await getServerSession(authOptions);
    const desiredUsername = searchParams?.desiredUsername;
     
    if(!session) {
        redirect('/');
    }

    return (
        <div>
            <form action={handleFormSubmit}>
                <h1 className="text-4xl font-bold text-center mb-2">Grab Your Username</h1>
                <p className="text-center mb-6 text-gray-500"> 
                    Choose Your Username
                </p>

                <div className="max-w-xs mx-auto">
                    <input type="text" placeholder="username"
                        name="userName"
                        defaultValue={desiredUsername}
                        className="block border-2 border-black-800 shadow py-2 px-4 text-center mb-2 w-full"
                    ></input>
                    <button type="submit" 
                        className= "bg-blue-500 text-white py-2 px-6 w-full flex items-center justify-center gap-2"
                    >
                        <span>Claim Username</span>
                        <RightIcon />
                        
                    </button>
                </div>

                
            </form>
        </div>
    );
}