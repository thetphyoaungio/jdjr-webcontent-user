"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Text, TextLink } from "../ui/typography";
import Link from "next/link";
import { getContactUs } from "@/lib/jdrinfo/data";

const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await getContactUs();

      if (result && result.status === 200) {
        let parseddata = JSON.parse(result.data);

        parseddata = {
          phones: [...parseddata.phone],
          emails: [...parseddata.email],
          socials: [...parseddata.socialmedia]
        };

        const footerData = {
          currentyear: new Date().getFullYear(),
          contactdata: { ...parseddata }
        };

        setFooterData({ ...footerData });

        sessionStorage.setItem("footer", JSON.stringify(footerData));
      }
    };

    let data = sessionStorage.getItem("footer");

    if (data) {
      data = JSON.parse(data);
      setFooterData(data);
    } else {
      fetchData();
    }
  }, []);

  return (
    <footer className="bg-blue-400 text-white border-t-4 border-yellow-150">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-10">
        <div className="flex flex-col justify-start items-center space-y-4">
          <Image
            src="/uploads/icons/logo/logo.svg"
            className="w-[180px] h-[56px]"
            width={180}
            height={56}
            alt="logo"
          />
          <div className="space-y-2">
            <div className="flex justify-center gap-x-6">
              <TextLink href="/aboutus" className="text-white text-sm">
                About Us
              </TextLink>
              <TextLink href="/termsconds" className="text-white text-sm">
                Terms & Conditions
              </TextLink>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center space-y-4">
          <div className="rounded-full bg-blue-500 px-6 py-1">
            <Text className="text-xl font-bold text-white">Contact Us</Text>
          </div>
          <div>
            <div className="flex flex-start items-start gap-x-4 mb-2">
              <Image
                src="/uploads/icons/footer/mail.svg"
                width={24}
                height={24}
                alt="mail"
              />
              <div className="space-y-2">
                {/* <Link className="block" href="mailto:jdjrsupport1@gmail.com">
                  jdjrsupport1@gmail.com
                </Link>
                <Link className="block" href="mailto:jdjrsupport2@gmail.com">
                  jdjrsupport2@gmail.com
                </Link> */}
                {footerData?.contactdata?.emails?.map(
                  (item: any, i: number) => (
                    <Link
                      key={`footer-contact-email-${i}`}
                      className="block"
                      href={`mailto:${item.email}`}
                    >
                      {item.email}
                    </Link>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-start items-start gap-x-4">
              <Image
                src="/uploads/icons/footer/phone.svg"
                width={24}
                height={24}
                alt="phone"
              />
              <div className="space-y-2">
                {/* <Link className="block" href="tel:+959 9123 456 789">
                  +959 9123 456 789
                </Link>
                <Link className="block" href="tel:+959 9123 456 789">
                  tel:+959 9123 456 789
                </Link> */}
                {footerData?.contactdata?.phones?.map(
                  (item: any, i: number) => (
                    <Link
                      key={`footer-contact-phone-${i}`}
                      className="block"
                      href={`tel:${item.phone}`}
                    >
                      {item.phone}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center space-y-4">
          <div className="rounded-full bg-blue-500 px-6 py-1">
            <Text className="text-xl font-bold text-white">Follow Us</Text>
          </div>
          <div
            className={`grid grid-cols-${
              footerData?.contactdata?.socials?.length > 4
                ? 4
                : footerData?.contactdata?.socials?.length
            } gap-x-4`}
            style={{ display: "flex" }}
          >
            {footerData?.contactdata?.socials?.map((item: any, i: number) => (
              <Link
                key={`footer-contact-social-${i}`}
                className="block"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="overflow-hidden rounded-full">
                  {item.slug === "facebook" && (
                    <Image
                      src="/uploads/icons/footer/facebook.svg"
                      width={40}
                      height={40}
                      alt="phone"
                    />
                  )}
                  {item.slug === "viber" && (
                    <Image
                      src="/uploads/icons/footer/viber.svg"
                      width={40}
                      height={40}
                      alt="phone"
                    />
                  )}
                  {item.slug === "linkedin" && (
                    <Image
                      src="/uploads/icons/footer/linkedin.svg"
                      width={40}
                      height={40}
                      alt="phone"
                    />
                  )}
                  {item.slug === "telegram" && (
                    <Image
                      src="/uploads/icons/footer/telegram.svg"
                      width={40}
                      height={40}
                      alt="phone"
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-blue-500 bg-opacity-20 py-[10px]">
        <Text className="text-white text-sm md:text-base text-center">
          {footerData && (
            <>
              © {footerData.currentyear} - {footerData.currentyear + 1} JD JR
              Company. All rights reserved.
            </>
          )}
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
