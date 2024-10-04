import Image from "next/image";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface ResultNotFoundProps {
  className?: string;
}
const ResultNotFoundPage: React.FC<ResultNotFoundProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center h-screen p-5 m-auto",
        className
      )}
    >
      <div className="flex items-center justify-center">
        <Image
          src="/uploads/images/search.png"
          width={201}
          height={200}
          alt="result not found page"
        />
      </div>
      <div className="text-center">
        <Text className="text-blue-500 text-[36px] font-bold">
          {"Results Not Found!"}
        </Text>
        <Text>
          {
            "We're sorry, but the keyword you are looking for doesn't exist. Please Try with different keywords."
          }
        </Text>
      </div>
    </div>
  );
};

export default ResultNotFoundPage;
