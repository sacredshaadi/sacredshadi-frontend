"use client";

import React, { useCallback } from "react";
import { AdminErrorPage } from "../../_components/adminArrorPage";
import { ErrorBoundary } from "@/components/errorBoundary";
import { SuperAdminLayout } from "../../_components/adminLayout";
import { toast } from "@/components/ui/use-toast";
import { useCreateBlogMutation } from "@/components/api";
import { useUserStore } from "@/app/context/user-context";
import { useRouter } from "next/navigation";
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
