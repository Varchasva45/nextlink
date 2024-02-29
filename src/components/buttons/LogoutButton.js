"use client";
import { signOut } from "next-auth/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";


export default function LogoutButton({
  className = 'flex items-center gap-2 border px-4 shadow rounded-lg',
  iconLeft = false,
  iconClasses = '',
}) {
  return (
    <button onClick={() => signOut()} className={className}>
        {iconLeft && (
          <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses} />
        )}
        <span>Logout</span>
        {!iconLeft && (
          <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses} />
        )}
    </button>
  );
}
