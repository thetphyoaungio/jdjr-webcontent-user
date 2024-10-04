import Image from 'next/image';
import { Text } from '@/components/ui/typography';

const UnderMaintainPage: React.FC = () => {
  return (
    <div className={`flex flex-col items-center justify-center h-screen p-5`}>
      <div className='flex items-center justify-center'>
        <Image
        src="/uploads/images/maintaince.png" 
        width={200}
        height={200}
        alt='under maintain page' />
      </div>
      <div className='text-center'>
        <Text className="text-blue-500 text-[36px] font-bold">{"We'll Be Right Back!"}</Text>
        <Text>{"Our website is currently under maintenance. We apologize for any inconvenience and appreciate your patience."}</Text>
      </div>
  </div>
  ); 
};

export default UnderMaintainPage;