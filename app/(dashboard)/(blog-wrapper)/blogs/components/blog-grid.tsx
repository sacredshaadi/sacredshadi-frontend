"use client";
import { useGetAllBlogsMutation } from "@/components/api";
import { GenericGridNodesTemplates } from "@/app/_components/generic-grid-nodes-template";
import { useState } from "react";

interface Props {
  userSide?: boolean;
  noPagination?: boolean;
}

export default function BlogGrid(props: Props) {
  const [reloadKey, setReloadKey] = useState(1);

  return (
    <GenericGridNodesTemplates
      key={reloadKey}
      userSide={props.userSide}
      setReloadKey={setReloadKey}
      noPagination={props.noPagination}
      mutation={useGetAllBlogsMutation}
    />
  );
}
