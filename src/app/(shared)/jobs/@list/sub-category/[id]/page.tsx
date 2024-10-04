import JobList from "@/components/pages/job/JobList";
import ResultNotFoundPage from "@/components/shared/ResultNotFound";
import { getAllForSideNavWithSubCates } from "@/lib/maincategory/data";
import { NextPage } from "next";
import { notFound } from "next/navigation";
import React from "react";

interface PageParams {
  params: { id: string };
}

const isValidSubCategory = async (id: string) => {
  try {
    const result: any = await getAllForSideNavWithSubCates();

    const subcategoryIds = JSON.parse(result.data)?.flatMap(
      (mainCategory: any) =>
        mainCategory.subCategories.map((subCategory: any) => subCategory._id)
    );

    return subcategoryIds.includes(id);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return false;
  }
};

const JobListBySubCategoryPage: NextPage<PageParams> = async ({
  params
}: {
  params: { id: string };
}) => {
  const isValid = await isValidSubCategory(params.id);
  // if (!isValid) {
  //   notFound();
  // }

  return isValid ? (
    <JobList subCategorySlug={params.id} />
  ) : (
    <ResultNotFoundPage />
  );
};

export default JobListBySubCategoryPage;
