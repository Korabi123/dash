import { Loader } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader className="size-8 text-gray-500 animate-spin" />
    </div>
  );
}

export default LoadingPage;
