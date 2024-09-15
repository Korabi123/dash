import { Faq } from "@/components/marketing/faq";
import { Features } from "@/components/marketing/features";
import { Header } from "@/components/marketing/header";
import { Hero } from "@/components/marketing/hero";

const HomePage = () => {
  return (
    <>
      <div className="bg-[#0b0221] h-[100vh] w-[100vw] -z-[100] absolute md:hidden block"></div>
      <Header />
      <Hero />
      <Features />
      <Faq />
    </>
  );
}

export default HomePage;
