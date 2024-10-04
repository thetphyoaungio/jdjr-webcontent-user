import type { Metadata } from "next";
import Home from "@/components/pages/home";
import { getContactUs } from "@/lib/jdrinfo/data";
import { getAllForAutocomplete } from "@/lib/jobpost/data";
import { NextPage } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Home | JD JR",
  description:
    "Explore a wide range of job opportunities tailored to your skills and preferences. Our job search platform allows you to find the perfect job by filtering through thousands of listings based on location, industry, and salary. Start your job search today and take the next step in your career!",
  openGraph: {
    images: [
      "https://jdjr-prod-next-image.s3.ap-southeast-1.amazonaws.com/logo-1200x630.png"
    ]
  }
};

const HomePage: NextPage = async () => {
  const currentYear = new Date().getFullYear();

  let contactusData: any = {
    phones: [],
    emails: [],
    socials: []
  };
  let searchOptionsData: any = [];

  const results: any = await Promise.all([
    getContactUs(),
    getAllForAutocomplete()
  ]);

  if (results) {
    if (results[0] && results[0].status === 200) {
      const contactdata = JSON.parse(results[0].data);

      contactusData = {
        phones: [...contactdata.phone],
        emails: [...contactdata.email],
        socials: [...contactdata.socialmedia]
      };
    }
    if (results[1] && results[1].status === 200) {
      const searchOptions = JSON.parse(results[1].data);

      searchOptionsData = [
        ...searchOptions.map((item: any) => ({
          label: item.title,
          value: item._id
        }))
      ];
    }
  }

  const headerdata = {
    searchOptions: searchOptionsData
  };

  const footerdata = {
    currentyear: currentYear,
    contactdata: { ...contactusData }
  };

  return <Home footerData={footerdata} headerData={headerdata} />;
};

export default HomePage;
