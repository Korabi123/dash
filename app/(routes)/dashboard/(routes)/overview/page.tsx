import { FilterButtons } from "@/components/dashboard/filter-buttons";
import { InfoSection } from "@/components/dashboard/info-section";

const DashboardOverviewPage = () => {
  return (
    <div className="ml-4 mb-20">
      <FilterButtons />
      <InfoSection />
    </div>
  );
}

export default DashboardOverviewPage;
