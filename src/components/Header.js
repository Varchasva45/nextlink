
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";

export default async function Header() {

  const session = await getServerSession(authOptions);

  return (
      <header className="bg-white py-4 border-b border-black w-full overflow-hidden">

        <div className="flex justify-between max-w-4xl mx-auto px-6">

          <div className="flex  items-center gap-7"> 

            <Link href={'/'} className="flex items-center gap-2 text-lg text-blue-500">
              <FontAwesomeIcon icon={faLink} className="h-6"/>
              <span className="font-bold">NextLink</span>
            </Link>

            <nav className="hidden md:flex  gap-5 text-slate-500 items-center text-lg">
              <Link href={'/'}>About</Link>
              <Link href={'/'}>Contact</Link>          
            </nav>

          </div>

          <nav className="flex gap-5 text-lg text-slate-500 items-center">
            
            {session && (
              <>
                <Link href={'/account'}>Hello, {session?.user?.name}</Link>
                <LogoutButton />
              </>
            )}

            {!session && (
              <>
                <Link href={'/login'}>Sign In</Link>
                <Link href={'/login'}>Create Account</Link>
              </>
            )}
            
          </nav>

        </div>
      </header>
    );
}