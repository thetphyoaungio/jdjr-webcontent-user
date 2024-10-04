"use client";
import {
  getAllForSideNav,
  getAllForSideNavWithSubCates
} from "@/lib/maincategory/data";
import {
  getByMainCategoryIdForSideNav,
  updateViewCount
} from "@/lib/subcategory/data";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { sheetOpen } from "../atoms";
import { ArrowLeft, BookOpenCheck, LayoutDashboard } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import SideNav from "@/components/layout/SideNav";
import Image from "next/image";

const defaultArray: any = [];
const defaultData: any = null;

const NavItems: any[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500"
  },
  {
    title: "Example",
    icon: BookOpenCheck,
    href: "/example",
    color: "text-orange-500",
    isChidren: true,
    children: [
      {
        title: "Example-01",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/employees"
      },
      {
        title: "Example-02",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-02"
      },
      {
        title: "Example-03",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-03"
      }
    ]
  }
];

const CategoryList = () => {
  const [mainCategories, setMainCategories] = useState(defaultArray);
  const [subCategories, setSubCategories] = useState(defaultData);
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null);
  const { isOpen, toggle, status, setStatus } = useSidebar();

  const router = useRouter();

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

  const handleOnClickMainMenu = (evt: any, categoryId: string) => {
    if (categoryId) {
      if (
        !subCategories ||
        (subCategories && subCategories.mainid !== categoryId)
      ) {
        setSubCategories({ mainid: categoryId, data: [] });

        getByMainCategoryIdForSideNav(categoryId)
          .then((res) => {
            const result: any = res;

            if (result && result.status === 200) {
              const data = JSON.parse(result.data);

              setSubCategories({ mainid: categoryId, data: data });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  const handleOnClickSubMenu = (evt: any, subcategory: any) => {
    updateViewCount(subcategory._id);

    setSelectedSubCategory({ ...subcategory });

    router.push(`/jobs/sub-category/${subcategory._id}`);
  };

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  return (
    <div
      className={cn(
        "relative min-h-screen border-r-4 border-blue-200 px-4 py-6",
        status && "duration-500",
        isOpen ? "md:w-[350px]" : "md:w-[85px]"
      )}
    >
      <div className="space-y-4 pb-16">
        <SideNav
          className="text-primary-500 opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-blue-100 group-hover:p-2 group-hover:opacity-100"
          items={mainCategories}
        />
        <div
          className={cn(
            "hidden md:flex items-center absolute bottom-4 right-[20px] z-20 cursor-pointer",
            isOpen ? "justify-end" : "justify-center",
            !isOpen && "rotate-180"
          )}
          onClick={handleToggle}
        >
          <Image
            src="/uploads/icons/minimize-arrow.svg"
            width={40}
            height={40}
            alt="minimize arrow"
          />
        </div>
      </div>
    </div>

    // <Accordion type="single" collapsible className="w-full p-4 md:p-0">
    //   {mainCategories &&
    //     mainCategories.length > 0 &&
    //     mainCategories.map((x: any, idx: number) => (
    //       <AccordionItem value={`main-menu-${idx}`} key={`main-menu-${idx}`}>
    //         <AccordionTrigger
    //           className="accordion-menu-trigger"
    //           onClick={(e) => handleOnClickMainMenu(e, x._id)}
    //           list
    //         >
    //           <div className="flex justify-start items-start space-x-2">
    //             <Image
    //               src={x.image || `/uploads/icons/menu/agriculture.svg`}
    //               width={24}
    //               height={24}
    //               alt="main menu icon"
    //               style={{ maxHeight: "24px" }}
    //             />
    //             <Text>{x.name}</Text>
    //           </div>
    //         </AccordionTrigger>
    //         {subCategories &&
    //           subCategories.data.length > 0 &&
    //           subCategories.data.map((x: any, idx: number) => (
    //             <AccordionContent
    //               key={`sub-menu-${idx}`}
    //               contentClassName="accordion-menu-content"
    //               className="space-y-3"
    //               onClick={(e) => handleOnClickSubMenu(e, x)}
    //             >
    //               <div
    //                 onClick={() => setOpen(false)}
    //                 className={cn(
    //                   "item",
    //                   selectedSubCategory &&
    //                     x._id === selectedSubCategory._id &&
    //                     "active"
    //                 )}
    //               >
    //                 <Text>{x.name}</Text>
    //               </div>
    //             </AccordionContent>
    //           ))}
    //       </AccordionItem>
    //     ))}
    // </Accordion>
  );
};

export default CategoryList;
