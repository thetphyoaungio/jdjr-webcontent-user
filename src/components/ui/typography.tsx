import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

interface TextProps extends PropsWithChildren {
  className?: string;
}

export const Text: React.FC<TextProps> = ({ children, className }) => {
  return (
    <p
      className={cn(
        "text-base text-neutral-400 leading-7 [&:not(:first-child)]:mt-0",
        className
      )}
    >
      {children}
    </p>
  );
};

export const TextLink: React.FC<TextProps & { href: string }> = ({
  children,
  href,
  className
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "text-base text-neutral-400 leading-5 [&:not(:first-child)]:mt-0 underline underline-offset-4",
        className
      )}
    >
      {children}
    </Link>
  );
};

export const Heading: React.FC<TextProps> = ({ children, className }) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl text-blue-500 font-semibold first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
};

export const SubHeading: React.FC<TextProps> = ({ children, className }) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-xl text-blue-600 font-semibold",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const List: React.FC<TextProps> = ({ children, className }) => {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
      {children}
    </ul>
  );
};
