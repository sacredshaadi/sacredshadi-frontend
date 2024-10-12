import BlogViewer from "@/app/_components/blog-viewer";
import { ErrorBoundary } from "@/components/errorBoundary";
import { AdminErrorPage } from "../../_components/adminArrorPage";
import { SuperAdminLayout } from "../../_components/adminLayout";

export default function Page(props: { params: { slug: string } }) {
  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Blogs" />}>
      <SuperAdminLayout title="Blogs">
        <BlogViewer blogId={parseInt(props.params.slug, 10)} />
      </SuperAdminLayout>
    </ErrorBoundary>
  );
}
