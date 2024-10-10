"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Blog } from "@/types";
import { useGetAllBlogsMutation } from "@/components/api";
import { toast } from "@/components/ui/use-toast";
import { CustomImage } from "@/app/utils/image";

export default function BlogGrid() {
  const [posts, setPosts] = useState<Blog[]>([]);

  const { mutate: getAllFn, isPending: loading, isError: error } = useGetAllBlogsMutation();

  useEffect(() => {
    try {
      getAllFn(
        {
          page: 1,
          pageSize: 10
        },
        {
          onSuccess: (data) => {
            setPosts(data);
          },
          onError: (error) => {
            console.error(error);
            toast({});
          }
        }
      );
    } catch (err) {
      console.error(err);
      toast({});
    }
  }, []);

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error: {error}</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
      {loading
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
        : posts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                <div className="relative h-48">
                  <CustomImage
                    width={400}
                    height={256}
                    alt={post.title}
                    className="max-h-64 object-cover"
                    src={post.media[0].mediaUrl || ""}
                  />
                </div>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>{/* <p className="text-muted-foreground">{post.excerpt}</p> */}</CardContent>
              </Card>
            </Link>
          ))}
    </div>
  );
}
