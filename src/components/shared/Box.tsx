"use client";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren, Suspense } from "react";
import { GRADIENT_BOX } from "./enums";
import Image from "next/image";

interface BoxProps extends PropsWithChildren {
  className?: string;
  border?: boolean;
  gradient?: GRADIENT_BOX;
  handleClickBox?:Function|any;
}

const Box: React.FC<BoxProps> = ({
  children,
  border = false,
  gradient,
  className,
  handleClickBox
}) => {
  const handleOnClick = () => {
    handleClickBox && handleClickBox()
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
    <div
      className={cn(
        "p-4 rounded-xl cursor-pointer transition-all",
        border && "border border-blue-200",
        gradient === GRADIENT_BOX.RIGHT && "gradient-right pl-8",
        gradient === GRADIENT_BOX.BOTTOM && "gradient-bottom",
        className
      )}

      onClick={handleOnClick}
    >
      {gradient === GRADIENT_BOX.RIGHT && (
        <div className="flex items-center">
          <Image
            src="/uploads/icons/bar.svg"
            className="absolute inset-y-0 left-4 my-auto"
            width={4}
            height={70}
            alt="bar"
          />
        </div>
      )}
      {children}
    </div>
    </Suspense>
  );
};

export default Box;
