import React, { useTransition } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface PageLink {
  link: string;
  label: string;
}

interface PageProps {
  pageLinks: PageLink[];
  backRoute?: string;
}

const BreadcrumbCom: React.FC<PageProps> = ({
  pageLinks,
  backRoute
}: {
  pageLinks: PageLink[];
  backRoute?: string;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <Button
            onClick={() => {
              if (typeof backRoute === "string") {
                startTransition(() => {
                  router.push(backRoute);
                });
              } else {
                router.back();
              }
            }}
            className="flex justify-center items-center bg-blue-100 text-blue-600 hover:bg-blue-150 font-semibold"
          >
            {isPending ? (
              <div className="mr-1 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 h-4 w-4" />
            ) : (
              <Image
                src="/uploads/icons/back-arrow.svg"
                className="mr-1 sp"
                alt="back arrow"
                width={20}
                height={20}
              />
            )}
            <span>Back</span>
          </Button>
        </BreadcrumbItem>

        {pageLinks &&
          pageLinks.map((item: PageLink, i: number) => (
            <div className="flex items-center gap-1.5" key={`pagelink-${i}`}>
              <BreadcrumbItem key={`pagelink-${i}`}>
                <BreadcrumbLink
                  href={item.link}
                  className={cn(
                    "uppercase font-semibold",
                    pageLinks[pageLinks.length - 1] === item && "text-blue-400"
                  )}
                >
                  {item.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {i !== pageLinks.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}

        {/* <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbCom;
