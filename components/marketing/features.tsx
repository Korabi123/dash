/* eslint-disable @next/next/no-img-element */
import { CalendarIcon, DashboardIcon } from "@radix-ui/react-icons";
import { CreditCardIcon, Table } from "lucide-react";

export const Features = () => {
  return (
    <div id="features" className="py-36 border-b border-white/15 flex bg-[#0b0221] flex-col items-center relative justify-center gap-10 px-4 sm:px-6 lg:px-8">
      <div className="absolute h-full w-full bg-gradient-to-b to-[#0b0221] opacity-50 z-[-100]" />
      <h1 className="text-center md:max-w-sm px-10 leading-[1.275] lg:text-5xl md:text-3xl text-2xl relative font-[365] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white">
        Features that work for your future.
      </h1>
      <p className="mt-4 z-10 text-white/60 text-center max-w-md font-[330] leading-[1.5] tracking-tight">
        Check out our features and experience the power of Dash. Start your
        journey today.
      </p>

      <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 mx-auto">
        <div className="p-10 cursor-pointer hover:scale-105 transition-all w-full md:min-w-[450px] md:max-w-[450px] rounded-md shadow-sm drop-shadow-sm shadow-violet-900/40">
          <h1 className="text-2xl text-white shadow-inner font-light tracking-wide">
            <DashboardIcon className="inline-block -mt-1 w-6 h-6 mr-4" />
            Analytics Dashboard
          </h1>
          <p className="text-white/60 mt-4 text-sm font-light tracking-wide">
            Easily track your finances with our intuitive dashboard. Get a clear
            overview of your accounts, transactions, and budgets.
          </p>
        </div>

        <div className="cursor-pointer hover:scale-105 transition-all p-10 w-full md:min-w-[450px] md:max-w-[450px] rounded-md shadow-sm drop-shadow-sm shadow-violet-900/40">
          <h1 className="text-2xl text-white shadow-inner font-light tracking-wide">
            <CalendarIcon className="inline-block -mt-1 w-6 h-6 mr-4" />
            Filter Transactions by Date
          </h1>
          <p className="text-white/60 mt-4 text-sm font-light tracking-wide">
            Easily filter your transactions by date to get a clear overview of
            your finances.
          </p>
        </div>

        <div className="cursor-pointer hover:scale-105 transition-all p-10 w-full md:min-w-[450px] md:max-w-[450px] rounded-md shadow-sm drop-shadow-sm shadow-violet-900/40">
          <h1 className="text-2xl text-white shadow-inner font-light tracking-wide">
            <CreditCardIcon className="inline-block -mt-1 w-6 h-6 mr-4" />
            Filter Transactions by Account
          </h1>
          <p className="text-white/60 mt-4 text-sm font-light tracking-wide">
            Easily filter your transactions by account to get a clear overview
            of your finances.
          </p>
        </div>

        <div className="cursor-pointer hover:scale-105 transition-all p-10 w-full md:min-w-[450px] md:max-w-[450px] rounded-md shadow-sm drop-shadow-sm shadow-violet-900/40">
          <h1 className="text-2xl text-white shadow-inner font-light tracking-wide">
            <Table className="inline-block -mt-1 w-6 h-6 mr-4" />
            Transactions Table for Easy Tracking
          </h1>
          <p className="text-white/60 mt-4 text-sm font-light tracking-wide">
            Effortlessly organize, track, and manage all your financial
            transactions in a comprehensive, easy-to-navigate table, providing
            you with a clear and detailed overview of your finances at a glance.
          </p>
        </div>
      </div>
    </div>
  );
};
