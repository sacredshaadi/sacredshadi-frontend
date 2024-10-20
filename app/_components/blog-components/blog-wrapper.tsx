"use client";

import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { RichTextInput } from "../rich-text-input";
import { cn } from "@/lib/utils";
import SaveBlog from "../../admin/(blog-wrapper)/blogs/components/save-blog";
import UpdateBlog from "../../admin/(blog-wrapper)/blogs/components/update-blog";
import { Blog, Category } from "@/types";
import { FormImageUploader } from "@/components/ui/imageUploader";
import { uploadToCloudinaryUtil } from "../functions";
import ImageUploader2 from "../image-uploader-2";
import { toast } from "@/components/ui/use-toast";
import BlogTags from "./blog-tags";
import BlogMultiSelect from "./blog-multi-select";
import { Option } from "@/components/ui/multiselect";
import { useUserStore } from "@/app/context/user-context";
import { useGetAllCategoriesMutation } from "@/components/api";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogWrapperProps {
  blog?: Blog;
  userFacing?: boolean;
}

const headingClasses = cn(
  "h-fit w-full border-none !p-2 text-xl font-semibold text-gray-600 shadow-none outline-0 placeholder:text-gray-400 placeholder:drop-shadow-sm sm:text-2xl lg:text-3xl 2xl:text-4xl",
  "focus-visible:ring-0",
  "disabled:text-muted-foreground flex-1"
);

const BlogWrapper = ({ blog, userFacing }: BlogWrapperProps) => {
  const [heading, setHeading] = React.useState(blog?.title || "");
  const [content, setContent] = React.useState<any>(blog?.content || []);
  const [thumbnail, setThumbnail] = React.useState<string | null>(blog?.thumbnail || null);
  const [bgImage, setBgImage] = React.useState<string | null>(blog?.bgImage || null);
  const [assetUpload, setAssetUpload] = React.useState(false);
  const [allCategories, setAllCategories] = React.useState<Option[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<Option[]>(
    (blog?.categories || []).map((cat: any) => ({
      label: cat.category.name,
      value: `${cat.categoryId}`
    })) || ([] as Option[])
  );

  const maxHeadingLength = useRef(35);

  const { super_admin } = useUserStore();

  const { mutate: getFn, isPending: catPending, isError: catError, isIdle: catIdle } = useGetAllCategoriesMutation();

  useEffect(() => {
    try {
      if (!super_admin?.tokens?.accessToken) return;
      getFn(super_admin.tokens.accessToken, {
        onSuccess: (data) => {
          setAllCategories(
            ((data.data || []) as any[]).map((cat) => ({
              label: cat.name,
              value: `${cat.id}`
            }))
          );
        },
        onError: (err) => {
          throw err;
        }
      });
    } catch (err: any) {
      const msg = err?.error || err?.message || "An error occurred";
      toast({
        title: "Error fetching categories",
        variant: "destructive",
        description: msg
      });
    }
  }, []);

  return (
    <section className={cn("grid h-full grid-cols-1 gap-1 lg:gap-8 2xl:gap-12", "mx-auto max-w-[90vw]")}>
      {!userFacing &&
        (blog ? (
          <UpdateBlog
            maxHeadingLength={maxHeadingLength}
            data={{
              title: heading,
              content,
              id: blog.id,
              thumbnail,
              bgImage,
              categoryIds: selectedCategories.map((cat) => parseInt(cat.value, 10))
            }}
            disabled={assetUpload}
          />
        ) : (
          <SaveBlog
            maxHeadingLength={maxHeadingLength}
            data={{
              title: heading,
              content,
              thumbnail,
              bgImage,
              categoryIds: selectedCategories.map((cat) => parseInt(cat.value, 10))
            }}
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
            readonly={userFacing}
          />
        </section>

        {/* <section clssName="grid grid-cols-1 items-start gap-1"> */}
        <section className="flex items-center gap-2">
          <section className="h-36 w-48">
            <ImageUploader2
              classes={["h-36 w-48"]}
              onImageUpload={(url) => setThumbnail(url)}
              updateParentState={(val) => setAssetUpload(val)}
              defaultValue={thumbnail || ""}
              readonly={userFacing}
            />
          </section>

          <section className="flex-1">
            {userFacing ? (
              <span className={headingClasses}>{heading}</span>
            ) : (
              <>
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
              </>
            )}
          </section>
        </section>
        {/* </section> */}
      </section>
      {catIdle || catPending ? (
        <Skeleton className="h-8 w-1/2" />
      ) : catError ? (
        <div className="text-red-500">Error fetching categories</div>
      ) : (
        <BlogMultiSelect
          allCategories={allCategories}
          categories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          userFacing={userFacing}
        />
      )}

      <RichTextInput setContent={setContent} loadedContent={content} userFacing={userFacing} />
    </section>
  );
};

export default BlogWrapper;
