import Image from "next/image";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface ResultNotFoundProps {
  className?: string;
}
const NoJobFound: React.FC<ResultNotFoundProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center h-screen p-5 mx-auto",
        className
      )}
    >
      <div className="flex items-center justify-center">
        <Image
          src="/uploads/icons/no-job-found.svg"
          width={201}
          height={200}
          alt="result not found page"
        />
      </div>
      <div className="text-center">
        <Text className="text-blue-500 text-[36px] font-bold">
          No Job Found!
        </Text>
        <Text>{"We don't have any jobs for this position yet."}</Text>
      </div>
    </div>
  );
};

export default NoJobFound;
