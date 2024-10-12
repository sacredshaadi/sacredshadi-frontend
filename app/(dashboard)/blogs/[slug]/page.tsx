import BlogViewer from "../../../_components/blog-viewer";

export default function Page(props: { params: { slug: string } }) {
  return (
    <div>
      <BlogViewer blogId={parseInt(props.params.slug, 10)} />
    </div>
  );
}
