"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, Menu, Search } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import AutoComplete, { type Option } from "@/components/Autocomplete";
import Image from "next/image";

import { useParams, usePathname } from "next/navigation";
import { getAllForAutocomplete } from "@/lib/jobpost/data";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "../ui/accordion";
import { getAllForSideNavWithSubCates } from "@/lib/maincategory/data";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "../ui/navigation-menu";

const Header = () => {
  const pathname = usePathname();
  const params = useParams();
  const [value, setValue] = useState<Option>();
  const [mainCategories, setMainCategories] = useState([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchOptions, setSearchOptions] = useState<any>([]);
  const [openItem, setOpenItem] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await getAllForAutocomplete();

      if (result && result.status === 200) {
        let parseData = JSON.parse(result.data);

        parseData = [
          ...parseData.map((item: any) => ({
            label: item.title,
            value: item._id,
            maincategoryslug: item.maincategoryslug,
            subcategoryslug: item.subcategoryslug
          }))
        ];

        setSearchOptions([...parseData]);

        sessionStorage.setItem(
          "header",
          JSON.stringify({ searchOptions: [...parseData] })
        );
      }
    };
    fetchData();
    // let data: any = sessionStorage.getItem("header");

    // if (data) {
    //   data = JSON.parse(data);
    //   setSearchOptions([...data.searchOptions]);
    // } else {
    //   fetchData();
    // }
  }, []);

  useEffect(() => {
    const getMainCategories = async () => {
      const result: any = await getAllForSideNavWithSubCates();
      if (result && result.status === 200) {
        const data = JSON.parse(result.data);

        setMainCategories(data);
      }
    };

    getMainCategories();
  }, []);

  return (
    <header className="sticky top-0 flex h-[56px] lg:h-[80px] items-center gap-4 border-b bg-navBanner px-4 md:px-6 z-[99]">
      <nav className="hidden md:flex justify-between w-full items-center">
        <div className="flex items-center gap-x-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Image
              src="/uploads/icons/logo/logo.svg"
              className="w-[180px] h-[56px]"
              width={180}
              height={56}
              alt="logo"
            />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <form className="min-w-[464px]">
            <div className="relative">
              {searchOptions && (
                <AutoComplete
                  options={searchOptions}
                  emptyMessage="No result found!"
                  placeholder="Find something"
                  onValueChange={setValue}
                  value={value}
                />
              )}
            </div>
          </form>
        </div>

        <div className="flex items-center gap-x-8">
          <Link
            href="/"
            className={cn(
              "text-white transition-colors hover:text-yellow-150",
              pathname === "/" && "active-nav"
            )}
          >
            Home
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "text-white p-0 h-auto",
                    params.slug && "active-nav"
                  )}
                >
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-8 w-full">
                  <ul className="grid grid-cols-12 gap-x-6 gap-y-3">
                    {mainCategories.map((category: any, key) => (
                      <li key={key} className="col-span-3 list-none">
                        <NavigationMenuLink
                          key={key}
                          asChild
                          className="font-semibold hover:text-blue-400 transition-colors"
                        >
                          <Link
                            href={`/jobs/${category.slug}/${category?.subCategories[0]?.slug}`}
                            className={cn(
                              "text-neutral-400 hover:border-b hover:border-blue-400 transition",
                              category?.slug === params?.slug &&
                                "text-blue-400 border-b border-blue-400"
                            )}
                          >
                            {category.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Link
            href="/aboutus"
            className={cn(
              "text-white transition-colors hover:text-yellow-150",
              pathname === "/aboutus" && "active-nav"
            )}
          >
            About Us
          </Link>
          <Link
            href="/termsconds"
            className={cn(
              "text-white transition-colors hover:text-yellow-150",
              pathname === "/termsconds" && "active-nav"
            )}
          >
            Terms & Conditions
          </Link>
          <Link href="/contactus">
            <Button className="bg-yellow-150 hover:bg-yellow-200 text-blue-500">
              Contact Us
            </Button>
          </Link>
        </div>
      </nav>
      <Sheet>
        <div className="flex justify-between items-center w-full md:hidden">
          <div className="flex justify-start items-center gap-x-3">
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 md:hidden p-0 w-auto hover:bg-transparent"
              >
                <Menu className="h-5 w-5 text-white" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <Image
              src="/uploads/icons/logo/mobile-logo.svg"
              className="w-[99px] h-[34px]"
              width={99}
              height={34}
              alt="logo"
            />
          </div>

          <div className="flex justify-end items-center gap-x-4">
            <div onClick={() => setShowSearch(true)}>
              <Search className="w-6 h-6 text-white" />
            </div>
            <Link href="/contactus">
              <Button className="bg-yellow-150 hover:bg-yellow-200 text-blue-500 w-[84px] h-[32px] text-xs">
                Contact Us
              </Button>
            </Link>
          </div>
          {showSearch && (
            <form className="absolute left-0 w-full px-4">
              <div className="relative">
                {searchOptions && (
                  <>
                    <AutoComplete
                      options={searchOptions}
                      emptyMessage="No result found!"
                      placeholder="Search job title by keyword"
                      onValueChange={setValue}
                      value={value}
                      showCross={false}
                    />
                    <div
                      className="absolute flex items-center top-0 bottom-0 right-2 cursor-pointer"
                      onClick={() => setShowSearch(false)}
                    >
                      <Image
                        src="/uploads/icons/cross.svg"
                        width={24}
                        height={24}
                        alt="search"
                      />
                    </div>
                  </>
                )}
              </div>
            </form>
          )}
        </div>
        <SheetContent side="left" className="bg-blue-500 z-[999]">
          <nav className="grid text-base font-medium divide-y divide-blue-400">
            <Link
              href="/"
              className="text-white transition-colors hover:text-yellow-150 px-4 py-4 border-t border-blue-400"
            >
              Home
            </Link>
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={(val) => {
                setOpenItem(val);
              }}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-4 py-4 text-white border-b border-blue-400">
                  Categories
                  <ChevronDown
                    className="top-[1px] ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </AccordionTrigger>
                <AccordionContent className="px-4 py-4 pt-0">
                  {mainCategories?.map((each: any, key) => (
                    <SheetClose key={key} asChild>
                      <Link
                        href={`/jobs/${each?.slug}/${each?.subCategories[0].slug}`}
                        className={cn(
                          "block text-sm text-blue-200 transition-colors hover:text-yellow-150 p-4 pl-0",
                          each?.slug === params?.slug && "text-yellow-150"
                        )}
                      >
                        {each.name}
                      </Link>
                    </SheetClose>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <SheetClose asChild>
              <Link
                href="/aboutus"
                className="text-white transition-colors hover:text-yellow-150 px-4 py-4"
              >
                About Us
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/termsconds"
                className="text-white transition-colors hover:text-yellow-150 px-4 py-4 !border-b border-blue-400"
              >
                Terms & Conditions
              </Link>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
