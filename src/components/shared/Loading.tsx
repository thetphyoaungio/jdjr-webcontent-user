"use client";
import React from "react";

const PageLoading = () => {
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full z-[999] bg-white bg-opacity-35">
      <div className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-500 h-8 w-8" />
    </div>
  );
};

export default PageLoading;
