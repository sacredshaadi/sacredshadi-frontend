"use client";

import { useUserStore } from "@/app/context/user-context";
import { useRemoveBlogMutation } from "@/components/api";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Blog } from "@/types";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader2, XIcon } from "lucide-react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface BlogNodeProps {
  post: Blog;
  userSide?: boolean;
  setReloadKey: React.Dispatch<React.SetStateAction<number>>;
}

const RemoveModal = ({
  id,
  open,
  setOpen,
  setReloadKey
}: {
  id: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadKey: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const router = useRouter();
  const { super_admin } = useUserStore();
  const { mutate: removeFn, isPending, isError } = useRemoveBlogMutation();

  const submit = useCallback(() => {
    try {
      if (!super_admin || (super_admin?.tokens?.accessToken || "").length === 0) {
        throw new Error("No access token found");
      }

      removeFn(
        { accessToken: super_admin.tokens.accessToken, data: { id } },
        {
          onSuccess: () => {
            setOpen(false);
            toast({ title: "Success", description: "Blog removed successfully" });
            setReloadKey((prev) => -prev);
          },
          onError: (err) => {
            throw err;
          }
        }
      );
    } catch (err: any) {
      const msg: string = err.error || err.message || "An error occurred";
      toast({ title: "Error", description: err.message, variant: "destructive" });
      if (msg.includes("No access token found") || msg.includes("token expired")) {
        router.push("/admin/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        type="button"
        title="Remove"
        className="flex h-fit items-center justify-center rounded-full bg-primary p-2 text-white shadow-xl"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpen(true);
        }}
      >
        <XIcon className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this blog and all its data for every customer
            onboard.
          </DialogDescription>
          <DialogFooter className="flex justify-end gap-4">
            <DialogClose asChild>
              <Button variant="secondary" className="font-semibold shadow-lg" disabled={isPending}>
                No, keep it
              </Button>
            </DialogClose>
            <Button
              variant="default"
              className="font-semibold shadow-lg"
              disabled={isPending}
              onClick={submit}
              type="button"
            >
              {isPending && !isError && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>Yes, go ahead</span>
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const BlogNode = ({ post, userSide, setReloadKey }: BlogNodeProps) => {
  const [removeOpen, setRemoveOpen] = React.useState(false);

  return (
    <div className="relative">
      <Card className="overflow-hidden pb-0 pt-2 transition-shadow duration-300 hover:shadow-lg">
        <Link href={`${!userSide ? "/admin" : ""}/blog/${post.slug}`}>
          <CardHeader>
            <CardTitle className="leading-5">
              {post.title.substring(0, Math.min(post.title.length, 35))}
              {post.title.length > 35 ? "..." : ""}
            </CardTitle>
          </CardHeader>
        </Link>

        {!userSide && (
          <section className="absolute -right-2 -top-2 z-50 grid grid-cols-1 items-center gap-1 bg-transparent sm:gap-2">
            <RemoveModal id={post.id} open={removeOpen} setOpen={setRemoveOpen} setReloadKey={setReloadKey} />
          </section>
        )}
      </Card>
    </div>
  );
};

export default BlogNode;
