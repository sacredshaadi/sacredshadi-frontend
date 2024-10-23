"use client";

import { Button } from "@/components/ui/button";
import { useVendorSearch } from "@/hooks/useVendorSearch";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { UseMutationResult } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import BlogNode from "../(dashboard)/(blog-wrapper)/blogs/components/blog-node";
import { usePaginatedFetch } from "@/hooks/usePaginatedFetch";
import { useVendorSearchStore } from "../context/vendor-search-context";
import GenericNodesRenderer from "./generic-nodes-renderer";

interface Props {
  mutation: () => UseMutationResult<any, Error, any, unknown>;
  setReloadKey: React.Dispatch<React.SetStateAction<number>>;
  noPagination?: boolean;
  userSide?: boolean;
  [key: string]: any;
}

const EmptyState = () => (
  <>
    {Array(6)
      .fill(0)
      .map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      ))}
  </>
);

export function GenericGridNodesTemplates({
  mutation,
  setReloadKey,
  nodeComp,
  userSide,
  previewFormat,
  ...nodeProps
}: Props) {
  const { pageSize: defaultPageSize } = useVendorSearchStore();
  const { data, isPending, isIdle, isError, total, nextPage, prevPage, isPrevPageAvailable, isNextPageAvailable } =
    usePaginatedFetch(mutation, { page: 1, pageSize: previewFormat ? 6 : defaultPageSize }, { fetchOnRender: true });

  return (
    <GenericNodesRenderer
      errorMsg={isError ? "An error occurred while fetching blogs" : ""}
      isPending={isPending || isIdle}
      navigationProps={{
        currLength: data.length,
        displayNavigationBtns: !previewFormat,
        isNextPageAvailable,
        isPrevPageAvailable,
        nextPage,
        prevPage,
        totalLength: total
      }}
    >
      {data.map((item, idx) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, translateY: "2rem" },
            show: { opacity: 1, translateY: 0 }
          }}
          key={idx}
          transition={{ duration: 0.2 }}
        >
          <BlogNode post={item as any} userSide={userSide} setReloadKey={setReloadKey} />
        </motion.div>
      ))}
    </GenericNodesRenderer>
  );
}
