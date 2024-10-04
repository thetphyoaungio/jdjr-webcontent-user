"use client";
import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  ViberShareButton
} from "react-share";
import { Text } from "./ui/typography";
import Image from "next/image";

interface SocialsProps {
  url: string;
  hashtag?: string;
  title?: string;
  description?: string;
}

const Socials: React.FC<SocialsProps> = ({
  url,
  hashtag,
  title,
  description
}) => {
  return (
    <div>
      <Text className="text-blue-400 text-xs mb-1">Share Now</Text>
      <div className="flex justify-start items-center gap-2">
        <FacebookShareButton url={url} hashtag={hashtag}>
          <FacebookIcon size={24} round />
        </FacebookShareButton>
        <TelegramShareButton url={url} title={title}>
          <Image
            src="/uploads/icons/socials/telegram.svg"
            width={24}
            height={24}
            alt="telegram"
          />
        </TelegramShareButton>
        <ViberShareButton url={url} title={title}>
          <Image
            src="/uploads/icons/socials/viber.svg"
            width={24}
            height={24}
            alt="telegram"
          />
        </ViberShareButton>
        <LinkedinShareButton url={url} title={title} summary={description}>
          <Image
            src="/uploads/icons/socials/linkedin.svg"
            width={24}
            height={24}
            alt="telegram"
          />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default Socials;
