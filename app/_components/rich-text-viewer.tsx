"use client";

import { cn } from "@/lib/utils";
import { safeJsonParse } from "../utils/functions";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useState } from "react";

export type ShowRichTextProps = {
  data: any[];
  className?: string;
  userFacing?: boolean;
};

export function ShowRichText(props: ShowRichTextProps) {
  const [loading, setLoading] = useState(true);
  const editor = useCreateBlockNote({
    ...(!!props.data
      ? {
          initialContent: props.data
        }
      : {})
  });

  useEffect(() => {
    console.log("props.data:", props.data, "editor.document:", editor.document);
  }, [props.data, editor.document]);

  if (!props.data || !editor) return null;
  return (
    <BlockNoteView
      theme="light"
      editor={editor}
      editable={false}
      className={cn(
        // "my-4 block w-full rounded-md border-0 text-gray-900 shadow-md sm:text-sm sm:leading-6",
        props.className
      )}
    />
  );
}
