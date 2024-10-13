import { useUserStore } from "@/app/context/user-context";
import { useUpdateBlogsMutation } from "@/components/api";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Save } from "lucide-react";
import React from "react";

interface UpdateBlogProps {
  heading: string;
  content: any;
  id: number;
}

const UpdateBlog = (props: UpdateBlogProps) => {
  const { super_admin } = useUserStore();
  const { mutate: updateFn, isPending, isError } = useUpdateBlogsMutation();

  const updateBlog = () => {
    try {
      const err = [];
      if (props.heading === "") err.push("Heading cannot be empty");
      if (!props.content) err.push("Content cannot be empty");
      if (err.length > 0) throw new Error(err.join("\n"));
      if (!super_admin || (super_admin?.tokens?.accessToken || "").length === 0)
        throw new Error("Please login as admin");
      updateFn(
        {
          accessToken: super_admin.tokens.accessToken,
          data: { title: props.heading, content: props.content, id: props.id }
        },
        {
          onSuccess: (data) => {
            // const id = data.data.id || -1;
            toast({ title: "Success", description: "Blog saved successfully" });
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
  };

  return (
    <Button
      className="absolute bottom-2 right-2 z-50 flex h-fit w-fit items-center justify-center gap-2 px-4 py-3 text-lg font-semibold text-white shadow-lg sm:bottom-4 sm:right-4 sm:text-xl xl:bottom-8 xl:right-8"
      onClick={updateBlog}
      disabled={isPending}
    >
      {isPending && !isError ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save size={24} />}
      <span>{isPending ? "Updating" : "Update"}</span>
    </Button>
  );
};

export default UpdateBlog;
