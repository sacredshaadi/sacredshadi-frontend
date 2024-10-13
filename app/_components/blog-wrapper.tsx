"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import { RichTextInput } from "./rich-text-input";
import { cn } from "@/lib/utils";
import SaveBlog from "../admin/blogs/components/save-blog";
import UpdateBlog from "../admin/blogs/components/update-blog";
import { Blog } from "@/types";

interface BlogWrapperProps {
  blog?: Blog;
  userFacing?: boolean;
}

const headingClasses = cn(
  "h-fit w-full border-none !p-2 text-xl font-semibold text-muted-foreground shadow-none outline-0 placeholder:text-gray-400 placeholder:drop-shadow-sm sm:text-2xl lg:text-3xl 2xl:text-4xl",
  "focus-visible:ring-0",
  "disabled:text-muted-foreground"
);

const BlogWrapper = ({ blog, userFacing }: BlogWrapperProps) => {
  const [heading, setHeading] = React.useState<string>(blog?.title || "");
  const [content, setContent] = React.useState<any>(blog?.content || []);

  return (
    <section className="grid h-full grid-cols-1 gap-4 px-2 py-4 sm:px-4 lg:gap-8 lg:py-8 2xl:gap-12 2xl:py-12">
      {!userFacing &&
        (blog ? (
          <UpdateBlog content={content} id={blog.id} heading={heading} />
        ) : (
          <SaveBlog heading={heading} content={content} />
        ))}

      {userFacing ? (
        <span className={headingClasses}>{heading}</span>
      ) : (
        <Input
          className={headingClasses}
          placeholder="Enter title here.."
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          contentEditable={!userFacing}
        />
      )}

      <RichTextInput setContent={setContent} loadedContent={content} userFacing={userFacing} />
    </section>
  );
};

export default BlogWrapper;
