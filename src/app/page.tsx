import Hero from "@/components/hero";
import Navbar from "@/components/layout/Navbar";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="relative z-10">
        <Navbar />
        <Hero />
      </div>
    </div>
  );
}
