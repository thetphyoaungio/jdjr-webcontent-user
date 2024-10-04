"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getByIdForUser } from "@/lib/jobpost/data";
import BreadcrumbCom from "@/components/shared/Breadcrumb";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import MediaQuery from "react-responsive";
import ShareSocial from "@/components/shared/ShareSocial";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

interface PageProps {
  id: string;
}

const JobDetail: React.FC<PageProps> = ({ id }) => {
  const [detailData, setDetailData] = useState<any>(null);
  const [pageLinks, setPageLinks] = useState<any>([]);
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const { isOpen } = useSidebar();

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await getByIdForUser(id);

      if (result) {
        if (result.status === 200) {
          const detailData = JSON.parse(result.data);
          setDetailData({ ...detailData });

          setPageLinks([
            { link: "#", label: `${detailData?.maincategory?.name}` },
            {
              link: `/jobs/${detailData?.maincategory.slug}/${detailData?.subcategory.slug}`,
              label: `${detailData?.subcategory?.name}`
            },
            { link: "#", label: `${detailData?.title}` }
          ]);
        } else {
          router.push("/jobs/detail-not-found");
        }
      }
    };

    fetchData();
  }, [id, router]);

  return (
    detailData && (
      <div
        className={cn(
          "content-container space-y-4",
          isOpen ? "md:w-[calc(100%-350px)]" : "md:w-[calc(100%-82px)]"
        )}
      >
        <div className="flex items-center">
          <div className="flex-1 space-y-4">
            {pageLinks && (
              <BreadcrumbCom
                pageLinks={pageLinks}
                backRoute={`/jobs/${detailData?.maincategory.slug}/${detailData?.subcategory.slug}`}
              />
            )}
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
                <ShareSocial
                  openPopover={openPopover}
                  setOpenPopover={setOpenPopover}
                  jobId={id}
                  mainCateSlug={detailData?.maincategoryslug}
                  subCateSlug={detailData?.subcategoryslug}
                />
              </div>
            </MediaQuery>
          </div>
          <MediaQuery minWidth={768}>
            <ShareSocial
              openPopover={openPopover}
              setOpenPopover={setOpenPopover}
              jobId={id}
              mainCateSlug={detailData?.maincategoryslug}
              subCateSlug={detailData?.subcategoryslug}
            />
          </MediaQuery>
          {/* <div className="width-* flex-none">
            <button className="flex items-center p-1 rounded hover:opacity-90 hover:bg-blue-50">
              <div className="flex mr-2">Share</div>
              <div className="flex">
                <Image
                  src="/uploads/icons/share-bg-orange.svg"
                  className="w-[24px] h-[24px]"
                  width={24}
                  height={24}
                  alt="share icon"
                />
              </div>
            </button>
          </div> */}
        </div>

        <div className="job-detail-container">
          <div dangerouslySetInnerHTML={{ __html: `${detailData.content}` }} />
        </div>
      </div>
    )
  );
};

export default JobDetail;
