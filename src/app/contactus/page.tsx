import Layout from "@/components/layout";
import { Metadata, NextPage } from "next";
import Image from "next/image";
import { Text } from "@/components/ui/typography";
import { getContactUs } from "@/lib/jdrinfo/data";
import Box from "@/components/shared/Box";
import { GRADIENT_BOX } from "@/components/shared/enums";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us | JD JR",
  description:
    "Explore a wide range of job opportunities tailored to your skills and preferences. Our job search platform allows you to find the perfect job by filtering through thousands of listings based on location, industry, and salary. Start your job search today and take the next step in your career!",
  openGraph: {
    images: [
      "https://jdjr-prod-next-image.s3.ap-southeast-1.amazonaws.com/logo-1200x630.png"
    ]
  }
};

const AboutUsPage: NextPage = async () => {
  const result: any = await getContactUs();
  const data = JSON.parse(result.data);

  return (
    <Layout>
      <section className="section">
        <Text className="text-blue-500 md:text-4xl text-2xl font-bold">
          Contact Us
        </Text>
        {data?.description && (
          <div
            className="text-blue-250 font-medium"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
        )}
      </section>

      <section className="section">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="flex items-start justify-start gap-4">
            <Image
              src="/uploads/icons/phone-call.svg"
              width={24}
              height={24}
              alt="social-phones-image"
            />
            <div className="space-y-2">
              {data?.phone.map((item: any, i: number) => (
                <a
                  className="block text-wrap"
                  href={`tel:${item.phone}`}
                  key={i}
                >
                  {item.phone}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-start justify-start gap-4">
            <Image
              className="w-[24] h-[24]"
              src="/uploads/icons/mail-open.svg"
              width={24}
              height={24}
              alt="social-emails-image"
            />
            <div className="space-y-2">
              {data?.email?.map((item: any, i: number) => (
                <a
                  key={i}
                  className="block text-wrap"
                  href={`mailto:${item.email}`}
                >
                  {item.email}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section !pb-0">
        <div className="grid grid-cols-12 gap-6">
          {data?.socialmedia?.map((each: any, key: number) => (
            <Link
              key={key}
              className="col-span-12 md:col-span-3"
              href={each.url}
            >
              <Box
                border={true}
                gradient={GRADIENT_BOX.BOTTOM}
                className="hover:shadow-box flex justify-between items-center gap-4"
              >
                <Image src={each.image} width={80} height={80} alt="" />
                <div className="flex flex-col items-start gap-2">
                  <Text className="text-blue-600 font-bold text-2xl text-center">
                    {each.title}
                  </Text>

                  <div className="flex justify-center items-center gap-4">
                    <Text className="text-blue-400">Contact Now</Text>
                    <Image
                      src="/uploads/icons/goto.svg"
                      width={32}
                      height={32}
                      alt=""
                    />
                  </div>
                </div>
              </Box>
            </Link>
          ))}
        </div>
      </section>

      <Image
        src="/uploads/icons/contactus-bg.svg"
        width={1440}
        height={202}
        alt="contactus bg"
      />
    </Layout>
  );
};

export default AboutUsPage;
