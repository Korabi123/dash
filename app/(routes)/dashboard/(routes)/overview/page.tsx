import { UserButton } from "@clerk/nextjs";

const DashboardOverviewPage = () => {
  return (
    <UserButton afterSignOutUrl="/" />
  );
}

export default DashboardOverviewPage;
