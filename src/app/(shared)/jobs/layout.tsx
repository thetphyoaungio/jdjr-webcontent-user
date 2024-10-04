import Layout from "@/components/layout";
import JobLayoutContainer from "@/components/pages/job/JobLayout";
import React from "react";

const JobLayout = (props: {
  children: React.ReactNode;
  categories: React.ReactNode;
  list: React.ReactNode;
}) => {
  return (
    <Layout>
      <JobLayoutContainer
        categoriesList={props.categories}
        jobsList={props.list}
      />
    </Layout>
  );
};

export default JobLayout;
