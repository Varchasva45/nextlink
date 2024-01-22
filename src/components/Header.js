import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-white border-b py-4">

          <div className="flex justify-between max-w-4xl mx-auto px-6">

            <div className="flex gap-6"> 

              <Link href={'/'}>LinkList</Link>

              <nav className="flex gap-4 text-slate-500 text-sm items-center">
                <Link href={'/about'}>About</Link>
                <Link href={'/pricing'}>Pricing</Link>
                <Link href={'/contact'}>Contact</Link>          
              </nav>

            </div>

            <nav className="flex gap-3 text-sm text-slate-500 items-center">
              <Link href={'/login'}>Sign In</Link>
              <Link href={'/register'}>Create Account</Link>
            </nav>

          </div>
      </header>
    );
}