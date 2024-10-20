"use client";

import { useGetAllBlogsMutation, useGetAllCategoriesMutation } from "@/components/api";
import { toast } from "@/components/ui/use-toast";
import React, { useEffect } from "react";

interface BlogTagsProps {
  userFacing?: boolean;
}

const BlogTags = (props: BlogTagsProps) => {
  const { mutate: getFn, isError, isIdle, isPending } = useGetAllCategoriesMutation();

  // useEffect(() => {
  //   try {
  //     getFn(void 0, {
  //       onSuccess: (data) => {
  //         console.log("data", data);
  //       },
  //       onError: (error) => {
  //         throw error;
  //       }
  //     });
  //   } catch (err: any) {
  //     const msg = err.error || err.message || "An error occurred";
  //     toast({ title: "Error fetching blogs", variant: "destructive", description: msg });
  //   }
  // }, []);

  return <div>BlogTags</div>;
};

export default BlogTags;
