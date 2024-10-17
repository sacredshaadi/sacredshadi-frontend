"use client";

import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useRef } from "react";
import { RichTextInput } from "./rich-text-input";
import { cn } from "@/lib/utils";
import SaveBlog from "../admin/(blog-wrapper)/blogs/components/save-blog";
import UpdateBlog from "../admin/(blog-wrapper)/blogs/components/update-blog";
import { Blog } from "@/types";
import { FormImageUploader } from "@/components/ui/imageUploader";
import { uploadToCloudinaryUtil } from "./functions";
import ImageUploader2 from "./image-uploader-2";
import { toast } from "@/components/ui/use-toast";

interface BlogWrapperProps {
  blog?: Blog;
  userFacing?: boolean;
}

const headingClasses = cn(
  "h-fit w-full border-none !p-2 text-xl font-semibold text-muted-foreground shadow-none outline-0 placeholder:text-gray-400 placeholder:drop-shadow-sm sm:text-2xl lg:text-3xl 2xl:text-4xl",
  "focus-visible:ring-0",
  "disabled:text-muted-foreground flex-1"
);

const BlogWrapper = ({ blog, userFacing }: BlogWrapperProps) => {
  const [heading, setHeading] = React.useState(blog?.title || "");
  const [content, setContent] = React.useState<any>(blog?.content || []);
  const [thumbnail, setThumbnail] = React.useState<string | null>(blog?.thumbnail || null);
  const [bgImage, setBgImage] = React.useState<string | null>(blog?.bgImage || null);
  const [assetUpload, setAssetUpload] = React.useState(false);
  const maxHeadingLength = useRef(35);

  return (
    <section className={cn("grid h-full grid-cols-1 gap-1 lg:gap-8 2xl:gap-12")}>
      {!userFacing &&
        (blog ? (
          <UpdateBlog
            maxHeadingLength={maxHeadingLength}
            data={{ title: heading, content, id: blog.id, thumbnail, bgImage }}
            disabled={assetUpload}
          />
        ) : (
          <SaveBlog
            maxHeadingLength={maxHeadingLength}
            data={{ title: heading, content, thumbnail, bgImage }}
            disabled={assetUpload}
          />
        ))}
      <section className="space-y-2">
        <section className="lg:h-30 h-20 sm:h-24 xl:h-40 2xl:h-48">
          <ImageUploader2
            classes={["lg:h-30 h-20 sm:h-24 xl:h-40 2xl:h-48 w-full"]}
            onImageUpload={(url) => setBgImage(url)}
            updateParentState={(val) => setAssetUpload(val)}
            defaultValue={bgImage || ""}
          />
        </section>

        {userFacing ? (
          <span className={headingClasses}>{heading}</span>
        ) : (
          // <section clssName="grid grid-cols-1 items-start gap-1">
          <section className="flex items-center gap-2">
            <section className="h-36 w-48">
              <ImageUploader2
                classes={["h-36 w-48"]}
                onImageUpload={(url) => setThumbnail(url)}
                updateParentState={(val) => setAssetUpload(val)}
                defaultValue={thumbnail || ""}
              />
            </section>

            <section className="flex-1">
              <Input
                className={headingClasses}
                placeholder="Enter title here ..."
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                contentEditable={!userFacing}
              />
              <span
                className={cn(
                  "pl-2 text-sm font-semibold",
                  heading.length > maxHeadingLength.current ? "text-red-500" : "text-gray-400"
                )}
              >
                {maxHeadingLength.current - heading.length} letters left
                {heading.length > maxHeadingLength.current && <> (max {maxHeadingLength.current} allowed)</>}
              </span>
            </section>
          </section>
          // </section>
        )}
      </section>

      <RichTextInput setContent={setContent} loadedContent={content} userFacing={userFacing} />
    </section>
  );
};

export default BlogWrapper;
