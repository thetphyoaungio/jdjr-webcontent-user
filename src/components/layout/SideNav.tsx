"use client";
import Link from "next/link";

import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "../ui/accordion";
import { useSidebar } from "@/hooks/useSidebar";
import Image from "next/image";
import { Text } from "../ui/typography";
import { updateViewCount } from "@/lib/subcategory/data";
import { useAtom } from "jotai";
import { sheetOpen } from "../pages/job/atoms";

interface SideNavProps {
  items: any;
  setOpen?: (open: boolean) => void;
  className?: string;
}

const SideNav: React.FC<SideNavProps> = ({ items, setOpen, className }) => {
  const path = usePathname();
  const params = useParams();
  const [openItem, setOpenItem] = useState<string>("");
  const [lastOpenItem, setLastOpenItem] = useState<string>("");
  const [selected, setSelected] = useState<string>();

  const { isOpen, toggle, setStatus } = useSidebar();
  const [, setSheetOpen] = useAtom(sheetOpen);

  const defaultActive = items?.find((item: any) =>
    item?.subCategories?.find((each: any) => each?.slug === params?.subCateSlug)
  );

  useEffect(() => {
    if (isOpen) {
      if (defaultActive) {
        setOpenItem(defaultActive?._id);
      } else {
        setOpenItem(lastOpenItem);
      }
    } else {
      setLastOpenItem(openItem);
      setOpenItem("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, defaultActive]);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  return (
    <div className="space-y-2">
      {items?.map((each: any, key: any) => (
        <Accordion
          type="single"
          collapsible
          className="space-y-2"
          key={key}
          value={openItem}
          onValueChange={(val) => {
            setOpenItem(val);
          }}
        >
          <AccordionItem
            value={each?._id}
            className={`border-none ${each?._id}`}
          >
            <AccordionTrigger
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "accordion-menu-trigger",
                "group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline"
              )}
              onClick={() => {
                if (!isOpen) {
                  handleToggle();
                }
              }}
            >
              <Image
                src={each.image}
                width={24}
                height={24}
                alt="menu"
                className="w-[24px] h-[24px]"
              />
              <Text
                className={cn(
                  "absolute left-12 text-sm duration-200 z-10 menu-ellipsis",
                  !isOpen && className
                )}
              >
                {each.name}
              </Text>
              {isOpen && (
                <Image
                  alt="caret down"
                  width={24}
                  height={24}
                  className="transition-transform duration-200 caret-icon"
                  src="/uploads/icons/caret-down.svg"
                />
              )}
            </AccordionTrigger>
            <AccordionContent className="accordion-menu-content space-y-4">
              {each?.subCategories?.map((child: any, i: any) => {
                return (
                  <Link
                    key={i}
                    // href={`/jobs/sub-category/${child._id}`}
                    href={`/jobs/${each.slug}/${child.slug}`}
                    onClick={() => {
                      updateViewCount(child._id);
                      setSelected(child._id);
                      if (setOpen) setOpen(false);
                      setSheetOpen(false);
                    }}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "group relative flex h-12 justify-start gap-x-3 item",
                      (selected === child._id ||
                        params?.subCateSlug === child.slug) &&
                        "active",
                      path === child.href && "bg-muted font-bold hover:bg-muted"
                    )}
                  >
                    <Text
                      className={cn(
                        "absolute text-sm duration-200 z-50 text-wrap menu-ellipsis",
                        !isOpen && className
                      )}
                    >
                      {child?.name}
                    </Text>
                  </Link>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default SideNav;
