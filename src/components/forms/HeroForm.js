"use client";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";;
import { useEffect, useState } from "react";

export default function HeroForm() {

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
        console.log(username);
        
        if(username == "") {
            alert("Please enter a username");
            return;
        }

        window.localStorage.setItem("desiredUsername", username);

        await signIn('google', {
            redirect: '/account?username=' + username,
        });
    }

    return (
        <form className="inline-flex items-center shadow-lg shadow-gray-700/20"  onSubmit = {handleSubmit}>

            <span className=" bg-white py-4 pl-4 pr-0.5">linklist.to/</span>
            <input type = "text" className="py-4" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
            <button type="submit" className="rounded-sm bg-blue-500 text-white py-4 px-6" >
                Join for free
            </button>

        </form>
    );
}