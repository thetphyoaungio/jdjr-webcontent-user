"use client";
import { Sheet, SheetRef } from "react-modal-sheet";
import BreadcrumbCom from "@/components/shared/Breadcrumb";
import { getBySubCategoryId, getBySubCategorySlug } from "@/lib/jobpost/data";
import React, { useEffect, useRef, useState } from "react";
import Box from "@/components/shared/Box";
import Image from "next/image";
import { GRADIENT_BOX } from "@/components/shared/enums";
import { Text } from "@/components/ui/typography";
import { useRouter } from "next/navigation";
import { getById, getBySlug } from "@/lib/subcategory/data";
import { updateViewCountJobPost } from "@/lib/jobpost/data";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { sheetOpen } from "./atoms";
import MediaQuery from "react-responsive";
import JobItem from "@/components/shared/JobItem";
import ResultNotFoundPage from "@/components/shared/ResultNotFound";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import NoJobFound from "@/components/shared/NoJobFound";
import PageLoading from "@/components/shared/Loading";

interface PageProps {
  subCategorySlug: string;
}
const JobList: React.FC<PageProps> = ({ subCategorySlug }) => {
  const [jobs, setJobs] = useState<any>([]);
  const [pageLinks, setPageLinks] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [, setOpen] = useAtom(sheetOpen);
  const { isOpen } = useSidebar();

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const results: any = await getBySubCategorySlug(subCategorySlug);
      setLoading(false);
      if (results) {
        if (results.status === 200) {
          setJobs(results?.data);
        }
        setPageLinks([
          { link: "#", label: `${results?.data[0]?.maincategory?.name}` },
          { link: "#", label: `${results?.data[0]?.subcategory?.name}` }
        ]);
      }
    };

    fetchData();
  }, [subCategorySlug]);

  console.log(loading);

  // const handleOnclickBox = (jobid: string) => {
  //   updateViewCountJobPost(jobid);

  //   router.push(`/jobs/job-detail/${jobid}`);
  // };

  return (
    <div
      className={cn(
        "content-container space-y-4",
        isOpen ? "md:w-[calc(100%-350px)]" : "md:w-[calc(100%-82px)]"
      )}
    >
      {pageLinks && <BreadcrumbCom pageLinks={pageLinks} />}
      <MediaQuery maxWidth={767}>
        <div className="flex items-center justify-between">
          <Button
            onClick={() => router.back()}
            className="bg-blue-100 text-blue-600 hover:bg-blue-150 p-0 w-[50px] h-[36px]"
          >
            <Image
              src="/uploads/icons/back-arrow.svg"
              className="mr-1"
              alt="back arrow"
              width={20}
              height={20}
            />
          </Button>
          <Button
            variant="ghost"
            className="p-0 w-[50px] h-[36px]"
            onClick={() => setOpen(true)}
          >
            <Image
              src="/uploads/icons/layout-grid.svg"
              className="mr-1"
              alt="back arrow"
              width={50}
              height={50}
            />
          </Button>
        </div>
      </MediaQuery>
      {loading ? (
        <PageLoading />
      ) : jobs?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {jobs?.map((item: any, i: number) => (
            <JobItem key={i} item={item} />
          ))}
        </div>
      ) : (
        <NoJobFound className="h-[calc(100vh-230px)]" /> // Show NoJobFound if no jobs
      )}
    </div>
  );
};

export default JobList;
