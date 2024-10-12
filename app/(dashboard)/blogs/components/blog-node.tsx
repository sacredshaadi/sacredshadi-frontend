"use client";

import { CustomImage } from "@/app/utils/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Blog } from "@/types";
import Link from "next/link";

import { useRouter } from "next/navigation";
import React from "react";

interface BlogNodeProps {
  post: Blog;
  userSide?: boolean;
}

const BlogNode = ({ post, userSide }: BlogNodeProps) => {
  const router = useRouter();

  return (
    <Link href={`${!userSide ? "/admin" : ""}/blogs/${post.id}`}>
      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        {/* <div className="relative ">
          <CustomImage
            width={400}
            height={256}
            alt={post.title}
            className="max-h-64 object-cover"
            src={post.media[0].mediaUrl || ""}
          />
        </div> */}
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <p className="text-muted-foreground">{post.content.substring(0, Math.min(post.content.length, 20))}...</p> */}
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogNode;
