import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function loginPage() {

    const session = await getServerSession(authOptions);

    if(session) {
        return redirect("/account");
    }

    return (
        <div>
            <div className="p-4 max-w-xs mx-auto">
                <h1 className="text-4xl font-bold text-center mb-6">Sign In</h1>
                
                <p className="text-center mb-6 text-gray-500"> 
                    Sign in to your accounts using one of the methods below
                </p>
                
                <LoginWithGoogle />
            </div>

            
        </div>
    );
}