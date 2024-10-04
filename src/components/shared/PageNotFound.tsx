"use client";
import Image from "next/image";
import React from "react";
import { Text } from "../ui/typography";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 mx-auto">
      <div className="flex items-center justify-center">
        <Image
          src="/uploads/images/sad.png"
          width={200}
          height={200}
          alt="page not found image"
        />
      </div>
      <div className="text-center">
        <Text className="text-blue-500 text-[36px] font-bold">
          Oops! Page Not Found
        </Text>
        <Text>
          {
            "We're sorry, but the page you are looking for doesn't exist. It may have been moved or deleted."
          }
        </Text>
      </div>
    </div>
  );
};

export default PageNotFound;
