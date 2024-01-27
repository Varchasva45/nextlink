import { Authprovider } from "@/components/authprovider/Authprovider";
import HeroForm from "@/components/forms/HeroForm";

export default function Home() {
  return (
    <main>
      <section className="pt-24"> 

        <div className="max-w-md mb-8">
          <h1 className="text-6xl font-bold">Your one Link <br/>for everything</h1>
          <h2 className="text-gray-500 text-xl mt-6">Share your links, social profiles, contact info and more on one page</h2>
        </div>

        <Authprovider>
          <HeroForm />
        </Authprovider>

      </section>

    </main>
  );
}
