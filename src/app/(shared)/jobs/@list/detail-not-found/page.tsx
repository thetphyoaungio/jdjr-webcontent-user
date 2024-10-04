import Image from 'next/image';
import { Text } from '@/components/ui/typography';

const DetailNotFoundPage: React.FC = () => {
  return (
    <div className={`flex flex-col items-center justify-center h-screen p-5`}>
      <div className='flex items-center justify-center'>
        <Image
        src="/uploads/images/info.png" 
        width={200}
        height={200}
        alt='detail not found page' />
      </div>
      <div className='text-center'>
        <Text className="text-blue-500 text-[36px] font-bold">{"Details Not Found!"}</Text>
        <Text>{"We're sorry, but we couldn't find the detailed information since these are not uploaded yet."}</Text>
      </div>
  </div>
  ); 
};

export default DetailNotFoundPage;