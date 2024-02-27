import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Lato } from "next/font/google";
import AppSideBar from "@/components/layouts/AppSideBar";
import { Toaster } from "react-hot-toast";
import mongoose, { connect } from "mongoose";
import { Page } from "@/models/Page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function AppLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }

  await mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ owner: session?.user?.email });
  
  return (
    <html lang="en">
      <body className={lato.className}>
        <Toaster />
        <main className="flex min-h-screen">
          <aside
            className="w-64 p-3 px-6 pt-9 bg-white shadow">
            <div className="sticky top-0 p-2">
              <div className="rounded-full w-24 h-24 overflow-hidden mx-auto">
                <Image
                  src={session.user.image}
                  alt="avatar"
                  className="object-cover object-center"
                  width={256}
                  height={256}
                />
              </div>
              
              <div>
                
                {
                  page && <Link target="_blank" href={"/" + page.uri}> 
                    <div className="flex justify-center items-center gap-2 pt-3">
                      <FontAwesomeIcon icon={faLink} className="text-lg text-blue-500 h-6 w-6"/>
                      <span className="font-bold">{page.uri}</span>
                    </div> 
                  </Link>
                }
                
              </div>

              <div className="flex justify-center">
                <AppSideBar />
              </div>
            </div>
          </aside>

          <div className="w-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
