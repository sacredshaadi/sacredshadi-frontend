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
import { VendorSearchGrid } from "@/app/search/[slug]/vendor-search-grid";
import { useVendorSearch } from "@/hooks/useVendorSearch";
import { GenericGridNodesTemplates } from "@/app/_components/generic-grid-nodes-template";

interface Props {
  userSide?: boolean;
}

export default function BlogGrid(props: Props) {
  const [posts, setPosts] = useState<Blog[]>([]);

  const { mutate: getAllFn, isPending: loading, isError: error } = useGetAllBlogsMutation();

  const { onFormSubmit } = useVendorSearch(useGetAllBlogsMutation);

  return <GenericGridNodesTemplates mutation={useGetAllBlogsMutation} userSide={props.userSide} />;
}
