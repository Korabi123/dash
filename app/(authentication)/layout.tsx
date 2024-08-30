import CenteredRadialBackground from "@/components/backgrounds/centered-radial";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account"
}

const AuthPagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CenteredRadialBackground red={6} green={70} blue={143} opacity={0.5} />
      <div className="h-[100vh] relative w-[100vw] flex flex-col items-center justify-center">
        {children}
      </div>
    </>
  );
}

export default AuthPagesLayout;
