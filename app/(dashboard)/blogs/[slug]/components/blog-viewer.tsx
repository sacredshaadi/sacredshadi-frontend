"use client";

import { useState, useEffect } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBlogByIdMutation } from "@/components/api";
import { Blog } from "@/types";
import { CustomImage } from "@/app/utils/image";
import { toast } from "@/components/ui/use-toast";

export default function BlogViewer({ blogId }: { blogId: number }) {
  const [post, setPost] = useState<Blog | null>(null);
  const [mdxSource, setMdxSource] = useState<any>(null);
  const { mutate: getFn, isIdle, isPending, isError } = useGetBlogByIdMutation();

  useEffect(() => {
    try {
      getFn(
        {
          blogId
        },
        {
          onSuccess: (data) => {
            setPost(data);
            setMdxSource(serialize(data.content));
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
    <article className="mx-auto max-w-3xl p-4">
      <h1 className="mb-6 text-3xl font-bold">{post.title}</h1>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {post.media.map((mediaNode, index) => (
          <div key={index} className="relative h-48">
            <CustomImage
              src={mediaNode.mediaUrl || ""}
              fallbackStyle="height: 400px; width: 400px; margin: 20px auto 0px auto;"
              width={400}
              height={400}
              alt={mediaNode.createdAt}
              className="absolute inset-auto w-full object-cover"
              placeholder="data:image/base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
          </div>
        ))}
      </div>
      <div className="prose-lg prose max-w-none">
        <MDXRemote {...mdxSource} />
      </div>
    </article>
  );
}
