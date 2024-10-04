import Image from "next/image";
import { Text } from "@/components/ui/typography";

const NoInternetConnectionPage: React.FC = () => {
  return (
    <div className={`flex flex-col items-center justify-center h-screen p-5`}>
      <div className="flex items-center justify-center">
        <Image
          src="/uploads/images/no-internet.png"
          width={200}
          height={200}
          alt="no internet page"
        />
      </div>
      <div className="text-center">
        <Text className="text-blue-500 text-[36px] font-bold">
          No Internet Connection
        </Text>
        <Text>
          It seems you are not connected to the internet. Please check your
          network settings and try again.
        </Text>
      </div>
    </div>
  );
};

export default NoInternetConnectionPage;
