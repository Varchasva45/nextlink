import HeroForm from "@/components/forms/HeroForm";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default function Home() {

  const session = getServerSession(authOptions);

  return (
    <main className="flex items-center" style={{ height: "80vh" }}>
      <section className="max-w-md flex justify-between">
        <div>
          <div className="mb-8">
            <h1 className="text-6xl font-bold">Your one Link <br />for everything</h1>
            <h2 className="text-gray-800 text-xl mt-6">Share your links, social profiles, contact info and more on one page</h2>
          </div>
            <HeroForm user={session?.user}/>
        </div>

        
          <Image
            src="https://nextlink.s3.amazonaws.com/dt0lzdnxtjj.png"
            alt="hero"
            width={256}
            height={256}
            className="img hidden lg:absolute shadow lg:right-96 lg:top-0 lg:mt-28"
          />

          <Image
            src="https://nextlink.s3.amazonaws.com/dt0lzdo3imz.png"
            alt="hero"
            width={256}
            height={256}
            className="img hidden lg:absolute shadow lg:right-48 lg:top-0 lg:mt-52"
          />
       
      </section>
    </main>
  );
}
