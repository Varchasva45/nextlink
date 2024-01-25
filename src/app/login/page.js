import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
import React from 'react'

export default function loginPage() {
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