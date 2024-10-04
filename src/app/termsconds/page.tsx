import Layout from "@/components/layout";
import { Metadata, NextPage } from "next";
import { Text } from "@/components/ui/typography";
import { getTermsConditions } from "@/lib/jdrinfo/data";
import { getMyDateTime12 } from "@/lib/utils";
import { format } from "date-fns/format";

export const metadata: Metadata = {
  title: "Terms & Conditions | JD JR",
  description:
    "Explore a wide range of job opportunities tailored to your skills and preferences. Our job search platform allows you to find the perfect job by filtering through thousands of listings based on location, industry, and salary. Start your job search today and take the next step in your career!",
  openGraph: {
    images: [
      "https://jdjr-prod-next-image.s3.ap-southeast-1.amazonaws.com/logo-1200x630.png"
    ]
  }
};

const TermsAndCondsPage: NextPage = async () => {
  let termscondsData: any = {
    description: "",
    updatedAt: ""
  };

  const result: any = await getTermsConditions();
  if (result && result.status === 200) {
    const termconddata = JSON.parse(result.data);
    //console.log('got parse termconddata>', termconddata)

    termscondsData = {
      description: termconddata?.description, //extractTextFromHtml(termconddata.description),
      updatedAt:
        (termconddata?.updatedAt &&
          format(getMyDateTime12(termconddata?.updatedAt), "dd MMM yyyy")) ||
        ""
    };
  }

  return (
    <Layout>
      <section className="section">
        <p className="text-xs">Last Updated on {termscondsData.updatedAt}</p>
        <Text className="text-blue-500 md:text-4xl text-2xl font-bold">
          Terms & Conditions
        </Text>
        <div className="mt-7">
          {termscondsData.description && (
            <div
              dangerouslySetInnerHTML={{
                __html: `${termscondsData.description}`
              }}
            />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default TermsAndCondsPage;
