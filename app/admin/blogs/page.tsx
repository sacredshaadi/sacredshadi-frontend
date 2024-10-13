import BlogGrid from "@/app/(dashboard)/blogs/components/blog-grid";
import React from "react";
import { AdminErrorPage } from "../_components/adminArrorPage";
import { ErrorBoundary } from "@/components/errorBoundary";
import { SuperAdminLayout } from "../_components/adminLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Blogs" />}>
      <SuperAdminLayout title="Blogs">
        <section className="grid h-full w-full grid-cols-1 gap-4 p-0">
          <nav className="flex items-center justify-between">
            <Button size="lg" className="ml-auto font-semibold text-white shadow-lg" asChild>
              <Link href="/admin/blogs/create">Write a new blog</Link>
            </Button>
          </nav>

          <BlogGrid userSide={false} />
        </section>
      </SuperAdminLayout>
    </ErrorBoundary>
  );
};

export default page;
