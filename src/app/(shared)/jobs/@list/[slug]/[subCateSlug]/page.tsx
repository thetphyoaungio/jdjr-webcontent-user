import JobList from "@/components/pages/job/JobList";
import { getAllForSideNavWithSubCates } from "@/lib/maincategory/data";
import { NextPage } from "next";
import { notFound } from "next/navigation";
import React from "react";

interface PageParams {
  params: { slug: string; subCateSlug: string };
}

const isValidSubCategory = async (
  mainCategorySlug: string,
  subCategorySlug: string
): Promise<boolean> => {
  try {
    const result: any = await getAllForSideNavWithSubCates();
    const mainCategories = JSON.parse(result.data);

    const matchedMainCategory = mainCategories.find(
      (mainCategory: any) => mainCategory.slug === mainCategorySlug
    );

    if (!matchedMainCategory) {
      return false;
    }

    const matchedSubCategory = matchedMainCategory.subCategories.find(
      (subCategory: any) => subCategory.slug === subCategorySlug
    );

    return !!matchedSubCategory;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return false;
  }
};

const JobListBySubCategoryPage: NextPage<PageParams> = async ({
  params
}: {
  params: { slug: string; subCateSlug: string };
}) => {
  const isValid = await isValidSubCategory(params.slug, params.subCateSlug);

  console.log("is valid => ", isValid);

  if (!isValid) {
    notFound();
  }
  return <JobList subCategorySlug={params.subCateSlug} />;
  // return isValid ? (
  //   <JobList subcategoryId={params.subCateSlug} />
  // ) : (
  //   <ResultNotFoundPage />
  // );
};

export default JobListBySubCategoryPage;
