"use client";
import { NextPage } from "next";
import React from "react";
import JobDetail from "@/components/pages/job/JobDetail";

interface PageProps {
  params: { id: string };
}

const JobDetailPage: NextPage<PageProps> = ({ params }) => {
  const { id } = params;
  return <JobDetail id={id} />;
};

export default JobDetailPage;
