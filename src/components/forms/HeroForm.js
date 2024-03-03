"use client";
import { signIn} from "next-auth/react";
import { redirect , useRouter} from "next/navigation";;
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function HeroForm({user}) {

    console.log(user);

    const router = useRouter();
    const [username, setUsername] = useState("");

    useEffect(() => {
        
        if(
            'localStorage' in window && 
            window.localStorage.getItem("desiredUsername")
        ) {
            const username = window.localStorage.getItem("desiredUsername");
            window.localStorage.removeItem("desiredUsername");
            redirect("/account?desiredUsername=" + username);
        }
    }, []);


    async function handleSubmit(e) {
        e.preventDefault();
        
        if(username == "") {
            toast.error("Please enter a username");
            return;
        }

        window.localStorage.setItem("desiredUsername", username);

        if (username.length > 0) {
            if (user) {
              toast.loading('Creating account...');
              router.push('/account?desiredUsername='+username);
            } else {
              toast.loading('Signing in with Google...');
              window.localStorage.setItem('desiredUsername', username);
              await signIn('google');
            }
        }else {
            toast.error('Please enter a username');
        }
    }

    return (
        <form className="inline-flex items-center shadow-lg shadow-gray-700/20"  onSubmit = {handleSubmit}>

            <span className=" bg-white py-4 pl-4 pr-0.5">linklist.to/</span>
            <input type = "text" className="py-4 outline-none font-bold" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
            <button type="submit" className="bg-blue-500 text-white py-4 px-10">
                Join
            </button>

        </form>
    );
}