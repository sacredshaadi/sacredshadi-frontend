"use client";

import React from "react";
import { AdminErrorPage } from "../../_components/adminArrorPage";
import { ErrorBoundary } from "@/components/errorBoundary";
import { SuperAdminLayout } from "../../_components/adminLayout";
import BlogWrapper from "@/app/_components/blog-wrapper";

const page = () => {
  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Blogs" />}>
      <SuperAdminLayout title="Blogs">
        <BlogWrapper />
      </SuperAdminLayout>
    </ErrorBoundary>
  );
};

export default page;
