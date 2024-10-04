"use client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import Image from "next/image";
import Socials from "../Socials";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ShareSocialProps {
  openPopover: boolean;
  setOpenPopover: (arg: boolean) => void;
  jobId: string;
  className?: string;
  hideText?: boolean;
  list?: boolean;
  hashtag?: string;
  title?: string;
  description?: string;
  mainCateSlug: string;
  subCateSlug: string;
}

const ShareSocial: React.FC<ShareSocialProps> = ({
  openPopover,
  setOpenPopover,
  jobId,
  className,
  hideText = false,
  hashtag,
  title,
  description,
  list,
  mainCateSlug,
  subCateSlug
}) => {
  const [isCopied, setIsCopied] = useState<boolean>();
  const [copiedText, setCopiedText] = useState<string>("");

  const handleCopyAndRetrieve = async () => {
    if (!openPopover) {
      try {
        const url = process.env.NEXT_PUBLIC_URL;
        console.log(url);
        await navigator.clipboard.writeText(
          `${url}/jobs/${mainCateSlug}/${subCateSlug}/${jobId}`
        );

        const text = await navigator.clipboard.readText();
        setCopiedText(text);
        setIsCopied(true);
        toast("Copied to clipboard", {
          className: "maxMd:!w-[170px] flex justify-center m-auto !bg-blue-150"
        });

        // Reset the copied state after 2 seconds
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy and retrieve URL: ", error);
      }
    }
  };

  return (
    <Popover onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn("p-0 hover:bg-transparent h-auto", className)}
          onClick={handleCopyAndRetrieve}
        >
          {!hideText && <div className="flex mr-2">Share</div>}
          <div className="flex">
            {list ? (
              <Image
                src="/uploads/icons/share.svg"
                width={24}
                height={24}
                alt="share"
              />
            ) : (
              <Image
                src="/uploads/icons/share-bg-orange.svg"
                className="w-[24px] h-[24px]"
                width={24}
                height={24}
                alt="share icon"
              />
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="bg-white border border-yellow-150 rounded-xl shadow-none p-3"
      >
        <Socials
          title={title}
          description={description}
          hashtag={hashtag}
          url={copiedText}
        />
      </PopoverContent>
    </Popover>
  );
};

export default ShareSocial;
