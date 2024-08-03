"use client";
import handleFormSubmit from "@/actions/GrabUsername";
import RightIcon from "../icons/RightIcon";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function UsernameForm({desiredUsername}) {
        
    const [isTaken, setIsTaken] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 

    async function handleSubmit(formData) {

        let username = formData.get('userName').toLowerCase();
        formData.set('userName', username);

        setIsLoading(true);
        const result = await handleFormSubmit(formData);
        setIsLoading(false);

        if(!result) {
            setIsTaken(true);
            return;
        }else {
            setIsTaken(false);
        }

        if(result) {
            redirect("/account?created=" + formData.get('userName'));
        }
    }

    async function handleKeyDown(e) {
        if(e.key === ' ') {
            e.preventDefault();
            return;
        }
    }

    async function handleInput(e) {
        e.target.value = e.target.value.replace(/\s+/g, '');
    }

    return (
        <form action={handleSubmit} className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center mb-2 mt-8">Grab Your Username</h1>
            <p className="text-center mb-6 text-gray-800"> 
                Type your desired Your Username
            </p>

            <div className="max-w-xs mx-auto">
                <input type="text" placeholder="username"
                    name="userName"
                    defaultValue={desiredUsername}
                    onKeyDown={handleKeyDown}
                    onInput={handleInput}
                    className="block border-2 border-black-800 shadow py-2 px-4 text-center mb-2 w-full"
                ></input>
                
                {isTaken && (
                    <div className="bg-red-200 py-2 px-4 mb-2 text-center shadow border border-red-500 text-red-500">
                        *Username is Already Taken*
                    </div>
                )}

                <button type="submit" 
                    className= "bg-blue-500 text-white py-2 px-20 w-full flex items-center justify-center gap-2"
                >
                    <span>Claim Username</span>
                    <RightIcon />
                </button>
            </div>
        </form>
    );
}