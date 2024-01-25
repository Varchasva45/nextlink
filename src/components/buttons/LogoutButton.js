"use client";
import { signOut } from "next-auth/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";


export default function LogoutButton() {
  return (
    <button onClick={() => signOut()} className="flex items-center gap-2 p-2 px-4 border shadow-md ">
        <span>Logout</span>
        <FontAwesomeIcon icon={faRightFromBracket} className="h-6"/> 
    </button>
  );
}
