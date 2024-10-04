"use client";

import Layout from "@/components/layout";
import Box from "@/components/shared/Box";
import { GRADIENT_BOX } from "@/components/shared/enums";
import { Button } from "@/components/ui/button";
import { SubHeading, Text } from "@/components/ui/typography";
import { HOME } from "@/data/homeData";
import { saveUserInfo } from "@/lib/userinfo/data";
import { cn, generateUUID, getDeviceType, getMyDateTime12 } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { format } from "date-fns/format";
import Link from "next/link";
import {
  getLatestJobPosts,
  getPopularSubCategories,
  getTotalCountMainCategory,
  getTotalCountSubCategory
} from "@/lib/home/data";
import { useRouter } from "next/navigation";
import JobItem from "@/components/shared/JobItem";
import { sleep } from "@/lib/data";

const defaultData: any = null;

interface PageProps {
  footerData: any;
  headerData: any;
}

const Home: React.FC<PageProps> = ({ footerData, headerData }) => {
  const [userInfo, setUserInfo] = useState(defaultData);
  const [isNewUser, setIsNweUser] = useState(false);
  const [homeData, setHomeData] = useState<any>({
    latestJobPosts: [],
    totalMainCategoryCount: 0,
    totalSubCategoryCount: 0,
    popularCategories: []
  });

  if (typeof window !== "undefined") {
    sessionStorage.setItem("footer", JSON.stringify(footerData));
    sessionStorage.setItem("header", JSON.stringify(headerData));
  }

  useEffect(() => {
    const fetchData = async () => {
      const did = localStorage.getItem("device_id");

      const firstTimedel = localStorage.getItem('ftdel');

      if(!firstTimedel) {
        localStorage.removeItem("device_id");

        localStorage.setItem("ftdel", `true`);

        getUserInfoAndGeolocation();
      } else {
        if (!did) {
          getUserInfoAndGeolocation();
        }
      }

      const results: any = await Promise.all([
        getLatestJobPosts(9),
        getTotalCountMainCategory(),
        getTotalCountSubCategory(),
        getPopularSubCategories()
      ]);

      if (results) {
        if (results[0].status === 200) {
          const latestjobposts = JSON.parse(results[0].data);

          setHomeData((prev: any) => ({
            ...prev,
            latestJobPosts: [...latestjobposts]
          }));
        }

        if (results[1].status === 200) {
          setHomeData((prev: any) => ({
            ...prev,
            totalMainCategoryCount: +results[1].data
          }));
        }

        if (results[2].status === 200) {
          setHomeData((prev: any) => ({
            ...prev,
            totalSubCategoryCount: +results[2].data
          }));
        }

        if (results[3].status === 200) {
          const parsed = JSON.parse(results[3].data);

          setHomeData((prev: any) => ({
            ...prev,
            popularCategories: [
              ...parsed.map((item: any, i: number) => ({
                ...item
              }))
            ]
          }));
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isNewUser && userInfo) {
      if (
        userInfo.geolocation &&
        userInfo.geolocation.hasOwnProperty("location") &&
        userInfo.geolocation.hasOwnProperty("address")
      ) {
        const savedata = async () => {
          try {
            const formdata = new FormData();
            formdata.append("deviceid", userInfo.deviceid);
            formdata.append("devicetype", userInfo.devicetype);
            formdata.append("browserinfo", userInfo.browserinfo);
            formdata.append(
              "geolocation",
              JSON.stringify(userInfo.geolocation)
            );

            /* console.log("-----------------------");
            console.log("Call \"saveUserInfo(null, formdata)\"!");
            console.log("-----------------------"); */
            const result: any = await saveUserInfo(null, formdata);
            if (result && result.status !== 200) {
              //console.log('enterd by result here with error...')
              console.error(result.message);
              localStorage.removeItem("device_id");
            }
          } catch (error: any) {
            //console.log('enterd by try-catch here with error...')
            console.error(error);
            localStorage.removeItem("device_id");
          }
        };

        savedata();
      } else {
        console.error(
          "userInfo.geolocation is required for location and address properties!"
        );
      }
    }
  }, [userInfo, isNewUser]);

  const getUserInfoAndGeolocation = () => {
    let deviceid$: string | any = "";

    setIsNweUser(true);

    deviceid$ = generateUUID();

    //localStorage.setItem("device_id", deviceid$);

    const devicetype$ = getDeviceType();
    const browserinfo$ = navigator.userAgent;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          //console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          let ischangeLatlon = false;

          const latlon = localStorage.getItem("collon");

          if (latlon) {
            const parsedlatlon = JSON.parse(latlon);
            ischangeLatlon =
              parsedlatlon.lat !== latitude || parsedlatlon.lon !== longitude;
          } else {
            localStorage.setItem(
              "collon",
              JSON.stringify({ lat: latitude, lon: longitude })
            );
          }

          let parsedlsurl = null,
            url$ = "";

          const lsurl = localStorage.getItem("llrus");

          if (lsurl) {
            parsedlsurl = JSON.parse(lsurl);

            if (ischangeLatlon) {
              localStorage.setItem(
                "collon",
                JSON.stringify({ lat: latitude, lon: longitude })
              );

              if (parsedlsurl.type === 1) {
                url$ = `${process.env.NEXT_PUBLIC_OPENSTREETMAP_ENDPOINT}?lat=${latitude}&lon=${longitude}&format=jsonv2`;

                localStorage.setItem(
                  "llrus",
                  JSON.stringify({ url: url$, type: 1 })
                );
              } else {
                url$ = `${process.env.NEXT_PUBLIC_LOCATIONIQ_ENDPOINT}?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_ACCESS_KEY}&lat=${latitude}&lon=${longitude}&format=json`;

                localStorage.setItem(
                  "llrus",
                  JSON.stringify({ url: url$, type: 2 })
                );
              }
            } else url$ = parsedlsurl.url;
          } else {
            url$ = `${process.env.NEXT_PUBLIC_OPENSTREETMAP_ENDPOINT}?lat=${latitude}&lon=${longitude}&format=jsonv2`;

            parsedlsurl = { url: url$, type: 1 };

            localStorage.setItem("llrus", JSON.stringify(parsedlsurl));
          }

          fetch(url$)
            .then((response) => response.json())
            .then((data) => {
              const geolocation$ = {
                location: {
                  latitude: latitude,
                  longitude: longitude,
                },
                address: data?.address || null,
              };

              setUserInfo({
                deviceid: deviceid$,
                devicetype: devicetype$,
                browserinfo: browserinfo$,
                geolocation: geolocation$,
              });

              localStorage.setItem("device_id", deviceid$);
            })
            .catch((error) => {
              console.error("Error:", error);

              const url =
                parsedlsurl.type === 1
                  ? `${process.env.NEXT_PUBLIC_LOCATIONIQ_ENDPOINT}?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_ACCESS_KEY}&lat=${latitude}&lon=${longitude}&format=json`
                  : `${process.env.NEXT_PUBLIC_OPENSTREETMAP_ENDPOINT}?lat=${latitude}&lon=${longitude}&format=jsonv2`;

              localStorage.setItem(
                "llrus",
                JSON.stringify({
                  url: url,
                  type: parsedlsurl.type === 1 ? 2 : 1,
                })
              );

              fetch(url)
                .then((response) => response.json())
                .then((data) => {
                  const geolocation$ = {
                    location: {
                      latitude: latitude,
                      longitude: longitude,
                    },
                    address: data?.address || null,
                  };

                  setUserInfo({
                    deviceid: deviceid$,
                    devicetype: devicetype$,
                    browserinfo: browserinfo$,
                    geolocation: geolocation$,
                  });

                  localStorage.setItem("device_id", deviceid$);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            });
        },
        (error: any) => {
          console.log("Unable to retrieve your location.");
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Layout>
      <section className="bg-heroBanner bg-center bg-cover min-h-[316px]">
        <div className="grid grid-cols-12 md:gap-10 h-full">
          <div className="flex justify-center md:justify-end col-span-12 md:col-span-7">
            <div className="w-full md:w-[60%] px-8 flex flex-col justify-center">
              <Image
                src="/uploads/images/requirement-img.svg"
                width={350}
                height={115}
                alt="requirement image"
              />
              <Text className="text-neutral-900 font-medium">
                {`We've gathered all the information you need to hire the right
                people for your business.`}
              </Text>
            </div>
          </div>
          <div className="relative h-full col-span-12 md:col-span-5">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/uploads/images/banner-photo.svg"
                className="mt-4"
                width={300}
                height={300}
                alt="requirement image"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-blue-150">
        {!!homeData?.popularCategories?.length && (
          <section className="section">
            <div>
              <SubHeading className="text-center mb-11">
                Popular Categories
              </SubHeading>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                {
                  /* HOME */
                  homeData?.popularCategories?.map((item: any, i: number) => {
                    return (
                      <Link
                        href={`/jobs/${item.mainCategory.slug}/${item.subCategories[0]?.slug}`}
                        key={i}
                        className={cn(
                          "relative",
                          i === HOME.length - 1 &&
                            "maxMd:col-span-2 maxMd:justify-self-center"
                        )}
                      >
                        <Box
                          border={true}
                          gradient={GRADIENT_BOX.BOTTOM}
                          className="hover:shadow-box"
                        >
                          <div className="absolute -top-[20px] inset-x-0 mx-auto w-[44px] h-[44px] overflow-hidden rounded-full">
                            <Image
                              src={item.mainCategory.image}
                              className="w-[44px] h-[44px]"
                              width={44}
                              height={44}
                              alt=""
                            />
                          </div>
                          <Text className="text-blue-600 text-center pt-5 pb-3 min-h-[92px] h-[100px] line-clamp-3">
                            {item.mainCategory.name}
                          </Text>
                          <div className="flex justify-center mt-2">
                            <Image
                              src="/uploads/icons/next-arrow-circle.svg"
                              width={32}
                              height={32}
                              alt=""
                            />
                          </div>
                        </Box>
                      </Link>
                    );
                  })
                }
              </div>
            </div>
          </section>
        )}
        {!!homeData?.latestJobPosts?.length && (
          <section className="section space-y-9">
            <SubHeading className="text-center">
              Lasted Job Description
            </SubHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {homeData?.latestJobPosts?.map((item: any, i: number) => (
                <JobItem key={i} item={item} />
              ))}
            </div>

            <div className="flex justify-center">
              <Link href="/jobs">
                <Button className="space-x-3 btn">
                  <span>See All</span>
                  <Image
                    src="/uploads/icons/next-arrow.svg"
                    width={16}
                    height={8}
                    alt="next arrow"
                  />
                </Button>
              </Link>
            </div>
          </section>
        )}
      </div>

      <section className="section">
        <Box className="bg-homeInfo bg-cover bg-center px-6 md:px-24 py-8 space-y-6">
          <Text className="text-center">
            We are not a job search company. We simply gather the essential
            information needed to hire workers. We have many job categories and
            are always uploading new job post.
          </Text>
          <div className="w-full md:w-[calc(100%-235px)] mx-auto flex flex-col md:flex-row gap-6 md:gap-8">
            <Box className="bg-white bg-opacity-50 w-full md:w-1/2 p-7 flex flex-col items-center cursor-default">
              <Text className="text-lg">Total Job Categories</Text>
              <Text className="text-blue-500 text-[56px] font-bold">
                {homeData?.totalMainCategoryCount}+
              </Text>
            </Box>
            <Box className="bg-white bg-opacity-50 w-full md:w-1/2 p-7 flex flex-col items-center cursor-default">
              <Text className="text-lg">Total Job Roles</Text>
              <Text className="text-blue-500 text-[56px] font-bold">
                {homeData?.totalSubCategoryCount}+
              </Text>
            </Box>
          </div>
        </Box>
      </section>
    </Layout>
  );
};

export default Home;

//`${process.env.NEXT_PUBLIC_OPENSTREETMAP_ENDPOINT}?lat=${latitude}&lon=${longitude}&format=jsonv2`
//`${process.env.NEXT_PUBLIC_LOCATIONIQ_ENDPOINT}?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_ACCESS_KEY}&lat=${latitude}&lon=${longitude}&format=json`

/* geolocation$ = {
                location: {
                  latitude: latitude,
                  longitude: longitude,
                },
                address: {
                  city: "Mandalay",
                  country: "Myanmar",
                  country_code: "mm",
                  municipality: "Mandalay District",
                  postcode: "05051",
                  road: "57th Street",
                  state: "Mandalay",
                  suburb: "Pyigyidagun Township",
                },
              }; */
