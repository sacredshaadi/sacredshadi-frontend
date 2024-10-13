"use client";
import { useGetAllBlogsMutation } from "@/components/api";
import { GenericGridNodesTemplates } from "@/app/_components/generic-grid-nodes-template";
import { useState } from "react";

interface Props {
  userSide?: boolean;
}

export default function BlogGrid(props: Props) {
  const [reloadKey, setReloadKey] = useState(1);

  return (
    <GenericGridNodesTemplates
      mutation={useGetAllBlogsMutation}
      userSide={props.userSide}
      key={reloadKey}
      setReloadKey={setReloadKey}
    />
  );
}
