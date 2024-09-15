const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="text-white">
      <img src={"https://github.com/Korabi123/dash/blob/master/public/assets/gradient-bg.png"} alt="Background Image" className="-z-[100] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-fill mt-20" />
      {children}
    </main>
  );
}

export default MarketingLayout;
