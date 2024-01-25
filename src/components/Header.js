
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";


export default async function Header() {

  const session = await getServerSession(authOptions);
  console.log(session);

  return (
      <header className="bg-white border-b py-4">

        <div className="flex justify-between max-w-4xl mx-auto px-6">

          <div className="flex  items-center gap-6"> 

            <Link href={'/'} className="flex items-center gap-2 text-blue-500">
              <FontAwesomeIcon icon={faLink} className="h-6"/>
              <span className="font-bold">LinkList</span>
            </Link>

            <nav className="flex gap-4 text-slate-500 text-sm items-center">
              <Link href={'/about'}>About</Link>
              <Link href={'/pricing'}>Pricing</Link>
              <Link href={'/contact'}>Contact</Link>          
            </nav>

          </div>

          <nav className="flex gap-3 text-sm text-slate-500 items-center">
            
            {session && (
              <>
                <Link href={'/account'}>Hello, {session?.user?.name}</Link>
                <LogoutButton />
              </>
            )}

            {!session && (
              <>
                <Link href={'/login'}>Sign In</Link>
                <Link href={'/register'}>Create Account</Link>
              </>
            )}
            
          </nav>

        </div>
      </header>
    );
}