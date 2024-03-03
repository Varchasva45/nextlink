import { Authprovider } from "@/components/authprovider/Authprovider";
import HeroForm from "@/components/forms/HeroForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center" style={{ height: "80vh" }}>
      <section className="max-w-md flex justify-between">
        <div>
          <div className="mb-8">
            <h1 className="text-6xl font-bold">Your one Link <br />for everything</h1>
            <h2 className="text-gray-500 text-xl mt-6">Share your links, social profiles, contact info and more on one page</h2>
          </div>

          <Authprovider>
            <HeroForm />
          </Authprovider>
        </div>

        
          <Image
            src="https://nestlink.s3.amazonaws.com/fdkltbhl7q6.png"
            alt="hero"
            width={256}
            height={256}
            className="img hidden lg:absolute shadow lg:right-96 lg:top-0 lg:mt-28"
          />

          <Image
            src="https://nestlink.s3.amazonaws.com/624ltbgb8qj.png"
            alt="hero"
            width={256}
            height={256}
            className="img hidden lg:absolute shadow lg:right-48 lg:top-0 lg:mt-52"
          />
       
      </section>
    </main>
  );
}
