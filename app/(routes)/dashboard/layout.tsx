import { GreetingSection } from "@/components/dashboard/greeting";
import { HalfBackground } from "@/components/dashboard/half-background";
import { DashboardHeader } from "@/components/dashboard/header";

import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentClerkUser = await currentUser();

  if (!currentClerkUser) {
    return null;
  }

  const dbProfile = await prismadb.profile.findFirst({
    where: {
      userId: currentClerkUser.id,
    }
  });

  if (!dbProfile) {
    const createUser = async () => {
      await prismadb.profile.create({
        data: {
          userId: currentClerkUser.id,
          name: currentClerkUser.firstName,
          email: currentClerkUser.emailAddresses[0].emailAddress,
          image: currentClerkUser.imageUrl,
        }
      });
    }

    createUser();
  }

  const dbAccounts = await prismadb.account.findMany({
    where: {
      userId: currentClerkUser.id,
    }
  });

  if (!dbAccounts.length) {
    const createAccount = async () => {
      await prismadb.account.create({
        data: {
          userId: currentClerkUser.id,
          name: "Savings",
        }
      });
    }

    createAccount();
  }

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
