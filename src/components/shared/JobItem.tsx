"use client";
import React, { useState } from "react";
import Box from "./Box";
import { GRADIENT_BOX } from "./enums";
import Link from "next/link";
import { Text } from "../ui/typography";
import Image from "next/image";
import ShareSocial from "./ShareSocial";
import { updateViewCountJobPost } from "@/lib/jobpost/data";
import dayjs from "dayjs";
import { Skeleton } from "../ui/skeleton";

interface ItemProps {
  item: any;
  isLoading?: boolean;
}

const JobItem: React.FC<ItemProps> = ({ item, isLoading }) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  return isLoading ? (
    <div className="relative flex flex-row items-center justify-between gap-x-4 border border-blue-100 p-1 rounded-xl pl-8">
      <div className="space-y-2">
        <div className="flex items-center">
          <Skeleton className="absolute inset-y-0 left-4 my-auto w-[4px] h-[70px]" />
        </div>
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <Skeleton className="w-[102px] h-[102px] rounded-xl bottom-0 right-4" />
    </div>
  ) : (
    <Box
      className="relative h-[102px] hover:shadow-box"
      border={true}
      gradient={GRADIENT_BOX.RIGHT}
    >
      <Link
        href={`/jobs/${item.maincategoryslug}/${item.subcategoryslug}/${item._id}`}
        onClick={() => updateViewCountJobPost(item._id)}
        className="block h-full"
      >
        <div className="flex flex-col justify-center w-[calc(100%-102px)] h-full space-y-1">
          <Text className="text-blue-500 text-base font-bold truncate">
            {item.title}
          </Text>
          <Text className="text-xs text-neutral-400">
            Last Updated on {dayjs(item.updatedAt).format("DD MMM YYYY")}
          </Text>
        </div>

        <Image
          src={item.coverimage}
          className="absolute bottom-0 right-4"
          width={102}
          height={102}
          alt=""
        />
      </Link>
      <div className="absolute top-0 right-0 p-3">
        <ShareSocial
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
          jobId={item?._id}
          mainCateSlug={item?.maincategoryslug}
          subCateSlug={item?.subcategoryslug}
          hashtag={item?.hashtag}
          title={item?.sharelinktitle}
          description={item?.sharelinkdesc}
          list
          hideText
        />
      </div>
    </Box>
  );
};

export default JobItem;
