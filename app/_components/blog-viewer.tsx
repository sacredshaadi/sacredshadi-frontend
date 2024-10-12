"use client";

import { useState, useEffect } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBlogByIdMutation } from "@/components/api";
import { Blog } from "@/types";
import { CustomImage } from "@/app/utils/image";
import { toast } from "@/components/ui/use-toast";
import { ShowRichText } from "@/app/_components/rich-text-viewer";
import { RichTextInput } from "./rich-text-input";

export default function BlogViewer({ blogId, userFacing }: { blogId: number; userFacing?: boolean }) {
  useEffect(() => {
    console.log("blogId:", blogId);
  }, [blogId]);
  const [post, setPost] = useState<Blog | null>(null);
  const { mutate: getFn, isIdle, isPending, isError } = useGetBlogByIdMutation();

  useEffect(() => {
    try {
      getFn(
        {
          blogId
        },
        {
          onSuccess: async (data) => {
            setPost(data.data);
          },
          onError: (error) => {
            console.error(error);
            throw error;
          }
        }
      );
    } catch (err: any) {
      const msg = err.error || err.message || "An error occurred";
      console.error(err);

      toast({
        variant: "destructive",
        description: msg
      });
    }
  }, [blogId]);

  useEffect(() => {
    console.log("post content:", post?.content);
  }, [post?.content]);

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (isIdle || isPending) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 p-4">
        <Skeleton className="mx-auto h-8 w-3/4" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="h-48 w-full" />
            ))}
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <article className="mx-auto p-4">
      <div className="w-full">
        <h1 className="text-xl font-semibold text-muted-foreground shadow-none outline-0 placeholder:text-gray-400 placeholder:drop-shadow-sm sm:text-2xl lg:text-3xl 2xl:text-4xl">
          {post.title}
        </h1>
        <ShowRichText data={post.content} />
      </div>
    </article>
  );
}
