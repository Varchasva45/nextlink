
import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import {Lato} from 'next/font/google'
import AppSideBar from "@/components/layouts/AppSideBar";

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function AppLayout({ children }) {
  
  const session = await getServerSession(authOptions);
  if(!session) {
    return redirect("/");
  }
  
  return (
    <html lang="en">
      <body className={lato.className}>
        
        <main className="flex min-h-screen">
            <aside className="w-64 p-6 bg-white shadow">

                <div className="rounded-full w-24 overflow-hidden mx-auto">
                  <Image src={session.user.image} alt="avatar" width={256} height={256} />
                </div>

                <div className="flex justify-center">
                  <AppSideBar />
                </div>
                
            </aside>
            <div className="w-full">
              <div className="bg-white p-4 m-8 shadow">
                {children}
              </div>
            </div>
        </main>
        
      </body>
    </html>
  );
}