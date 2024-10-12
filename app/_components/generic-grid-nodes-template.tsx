"use client";

import { Loading } from "@/app/_components/loading";
import { Button } from "@/components/ui/button";
import { useVendorSearch } from "@/hooks/useVendorSearch";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { UseMutationResult } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import BlogNode from "../(dashboard)/blogs/components/blog-node";
import { ShowRichText } from "./rich-text-viewer";

interface Props {
  mutation: () => UseMutationResult<any, Error, any, unknown>;
  userSide?: boolean;
  [key: string]: any;
}

export function GenericGridNodesTemplates({ mutation, nodeComp, userSide, ...nodeProps }: Props) {
  const {
    data,
    isPending,
    isIdle,
    isError,
    total,
    nextPage,
    prevPage,
    isPrevPageAvailable,
    isNextPageAvailable,
    searched,
    onFormSubmit
  } = useVendorSearch(mutation);

  const container = {
    hidden: {},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVar = {
    hidden: { opacity: 0, translateY: "2rem" },
    show: { opacity: 1, translateY: 0 }
  };

  useEffect(() => {
    try {
      onFormSubmit({});
    } catch (err: any) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container w-full p-0">
      <motion.section
        className="grid grid-cols-1 gap-2 pb-8 md:grid-cols-2 md:gap-4 xl:grid-cols-3 3xl:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {isIdle || isPending
          ? Array(6)
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
              ))
          : data.map((item, idx) => (
              <motion.div variants={itemVar} key={idx} transition={{ duration: 0.2 }}>
                <BlogNode post={item as any} userSide={userSide} />
              </motion.div>
            ))}
      </motion.section>

      {searched && (
        <div className="flex w-full items-center justify-between sm:justify-around">
          <Button onClick={prevPage} disabled={!isPrevPageAvailable} className="flex-center shadow-lg">
            <ArrowLeft className="h-6 w-6 text-white" />
          </Button>

          {data.length === 0 ? (
            <div className="font-semibold text-muted-foreground ">Nothing matched with your search query</div>
          ) : (
            <div className="font-semibold text-muted-foreground drop-shadow-md ">{`${
              total && !isNaN(total) ? total : data.length
            } results found`}</div>
          )}

          <Button onClick={nextPage} disabled={!isNextPageAvailable} className="flex-center shadow-lg">
            <ArrowRight className="h-6 w-6 text-white" />
          </Button>
        </div>
      )}
    </section>
  );
}
