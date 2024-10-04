"use client";
import React, { useEffect, useState } from "react";
import { getLatestJobPosts } from "@/lib/home/data";
import Image from "next/image";
import MediaQuery from "react-responsive";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import BreadcrumbCom from "@/components/shared/Breadcrumb";
import { useAtom } from "jotai";
import { sheetOpen } from "./atoms";
import JobItem from "@/components/shared/JobItem";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

const LatestJobsList: React.FC = () => {
  const [latestJos, setLatestJos] = useState<any>();
  const [, setOpen] = useAtom(sheetOpen);
  const { isOpen } = useSidebar();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results: any = await Promise.all([getLatestJobPosts()]);
        if (results) {
          // processResults(results);
          setLatestJos(JSON.parse(results[0].data));
        }
      } catch (err) {
        // setError("Failed to fetch home data");
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div
      className={cn(
        "content-container space-y-4",
        isOpen ? "md:w-[calc(100%-350px)]" : "md:w-[calc(100%-82px)]"
      )}
    >
      <BreadcrumbCom
        backRoute="/"
        pageLinks={[
          { link: "#", label: "Jobs" },
          { link: "#", label: "Latest Job Description" }
        ]}
      />
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {latestJos?.map((item: any, i: number) => (
          <JobItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobsList;
