"use client";

import React, { useCallback } from "react";
import { AdminErrorPage } from "../../_components/adminArrorPage";
import { ErrorBoundary } from "@/components/errorBoundary";
import { SuperAdminLayout } from "../../_components/adminLayout";
import { RichTextInput } from "@/app/_components/rich-text-input";
import { ShowRichText } from "@/app/_components/rich-text-viewer";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { useCreateBlogMutation } from "@/components/api";
import { useUserStore } from "@/app/context/user-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

const page = () => {
  const [heading, setHeading] = React.useState<string>("");
  const [content, setContent] = React.useState<any>();
  const { super_admin } = useUserStore();
  const router = useRouter();
  const { mutate: saveFn, isPending, isError } = useCreateBlogMutation();

  const saveBlog = useCallback(() => {
    try {
      const err = [];
      if (heading === "") err.push("Heading cannot be empty");
      if (!content) err.push("Content cannot be empty");
      if (err.length > 0) throw new Error(err.join("\n"));
      if (!super_admin || (super_admin?.tokens?.accessToken || "").length === 0)
        throw new Error("Please login as admin");
      saveFn(
        { accessToken: super_admin.tokens.accessToken, data: { title: heading, content } },
        {
          onSuccess: () => {
            toast({ title: "Success", description: "Blog saved successfully" });
            setHeading("");
            setContent(null);
            router.push("/admin/blogs");
          },
          onError: (err) => {
            throw err;
          }
        }
      );
    } catch (err: any) {
      console.error(err);
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  }, [heading, content]);

  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Blogs" />}>
      <SuperAdminLayout title="Blogs">
        <section className="grid h-full grid-cols-1 gap-4 px-2 py-4 sm:px-4 lg:gap-8 lg:py-8 2xl:gap-12 2xl:py-12">
          <Button
            className="absolute bottom-2 right-2 z-50 flex h-fit w-fit items-center justify-center gap-2 px-4 py-3 text-lg font-semibold text-white shadow-lg sm:bottom-4 sm:right-4 sm:text-xl xl:bottom-8 xl:right-8"
            onClick={saveBlog}
            disabled={isPending}
          >
            {isPending && !isError ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save size={24} />}
            <span>{isPending ? "Saving" : "Save"}</span>
          </Button>
          <Input
            className={cn(
              "h-fit w-full border-none !p-2 text-xl font-semibold text-muted-foreground shadow-none outline-0 placeholder:text-gray-400 placeholder:drop-shadow-sm sm:text-2xl lg:text-3xl 2xl:text-4xl",
              "focus-visible:ring-0"
            )}
            placeholder="Enter title here.."
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />

          <RichTextInput setContent={setContent} />
        </section>
      </SuperAdminLayout>
    </ErrorBoundary>
  );
};

export default page;
