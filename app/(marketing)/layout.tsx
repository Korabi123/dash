import BgImage from "@/public/assets/gradient-bg-4x.png";
import Image from "next/image";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="text-white">
      <div className="absolute top-0 left-0 w-full h-full opacity-50 z-[-200]" />
      <img src={BgImage.src} alt="Background Image" className="md:block hidden absolute object-cover w-full -z-[100] mt-10" />
      {children}
    </main>
  );
}

export default MarketingLayout;
