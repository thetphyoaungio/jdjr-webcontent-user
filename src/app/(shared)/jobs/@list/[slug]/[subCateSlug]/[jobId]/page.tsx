import { Metadata, NextPage, ResolvingMetadata } from "next";
import React from "react";
import JobDetail from "@/components/pages/job/JobDetail";
import { getByIdForUser } from "@/lib/jobpost/data";

interface PageProps {
  params: { slug: string; subCateSlug: string; jobId: string };
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.jobId;
  const result: any = await getByIdForUser(id);
  const data = JSON.parse(result.data);

  const previousImages = (await parent).openGraph?.images || [];
  const baseUrl = "https://dev.d2b2vs1xtg0xr.amplifyapp.com";
  return {
    title: data?.title,
    description: data?.sharelinkdesc,
    openGraph: {
      url: `${baseUrl}/jobs/job-detail/${id}`,
      images: [data.coverimage, ...previousImages]
    }
  };
}

const JobDetailPage: NextPage<PageProps> = ({
  params
}: {
  params: { slug: string; subCateSlug: string; jobId: string };
}) => {
  return <JobDetail id={params.jobId} />;
};

export default JobDetailPage;
