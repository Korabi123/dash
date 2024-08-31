import { GreetingSection } from "@/components/dashboard/greeting";
import { HalfBackground } from "@/components/dashboard/half-background";
import { DashboardHeader } from "@/components/dashboard/header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col relative min-h-screen overflow-x-clip">
      <DashboardHeader />
      <HalfBackground />
      <div className="container md:px-8">
        <GreetingSection />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
