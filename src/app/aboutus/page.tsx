import Layout from "@/components/layout";
import { Metadata, NextPage } from "next";
import Image from "next/image";
import { Text } from "@/components/ui/typography";
import Box from "@/components/shared/Box";
import { getAboutUs } from "@/lib/jdrinfo/data";
import {
  getTotalCountMainCategory,
  getTotalCountSubCategory
} from "@/lib/home/data";

export const metadata: Metadata = {
  title: "About Us | JD JR",
  description:
    "Explore a wide range of job opportunities tailored to your skills and preferences. Our job search platform allows you to find the perfect job by filtering through thousands of listings based on location, industry, and salary. Start your job search today and take the next step in your career!",
  openGraph: {
    images: [
      "https://jdjr-prod-next-image.s3.ap-southeast-1.amazonaws.com/logo-1200x630.png"
    ]
  }
};

const AboutUsPage: NextPage = async () => {
  let aboutusData: any = {
    description: "",
    totalMainCategotry: 0,
    totalSubCategotry: 0
  };

  const results: any = await Promise.all([
    getAboutUs(),
    getTotalCountMainCategory(),
    getTotalCountSubCategory()
  ]);
  console.log("got aboutus results>", results);

  if (results) {
    aboutusData = {
      description: JSON.parse(results[0].data)?.description,
      totalMainCategotry: +results[1].data || 0,
      totalSubCategotry: +results[2].data || 0
    };
  }

  return (
    <Layout>
      <section className="section">
        <div className="grid md:grid-cols-5 grid-cols-1">
          <div className="md:col-span-2">
            <Image
              src="/uploads/images/aboutus-img01.png"
              className="w-[438px]"
              width={438}
              height={357}
              alt="aboutus-img01"
            />
          </div>
          <div className="md:col-span-3">
            <Text className="text-blue-500 md:text-4xl text-2xl font-bold">
              About Us
            </Text>
            {/* <div
              className="text-blue-250 text-base"
              dangerouslySetInnerHTML={{ __html: aboutusData.description }}
            /> */}
            {aboutusData?.description && (
              <div
                className="text-blue-250 font-medium"
                dangerouslySetInnerHTML={{ __html: aboutusData?.description }}
              />
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div
          className="flex items-center p-5 rounded"
          style={{
            backgroundImage: "url('/uploads/images/aboutus-img02.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <Box className="bg-white w-[208.27px] flex flex-col items-center mr-5 cursor-default">
            <Text className="text-sm text-blue-250 font-medium">
              Total Job Categories
            </Text>
            <Text className="text-blue-500 text-[46px] font-bold">
              {aboutusData?.totalMainCategotry}+
            </Text>
          </Box>
          <Box className="bg-white w-[208.27px] flex flex-col items-center cursor-default">
            <Text className="text-sm text-blue-250 font-medium">
              Total Job Roles
            </Text>
            <Text className="text-blue-500 text-[46px] font-bold">
              {aboutusData?.totalSubCategotry}+
            </Text>
          </Box>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUsPage;
