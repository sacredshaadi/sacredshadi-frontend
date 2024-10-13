"use client";

import { useUserStore } from "@/app/context/user-context";
import { useRemoveBlogMutation } from "@/components/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { DeleteIcon, Loader2 } from "lucide-react";
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
  const { mutate: removeFn, isPending, isError } = useRemoveBlogMutation();
  const router = useRouter();

  const { super_admin } = useUserStore();

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
      console.error(err);
      toast({ title: "Error", description: err.message, variant: "destructive" });
      if (msg.includes("No access token found") || msg.includes("token expired")) {
        router.push("/admin/login");
      }
    }
  }, [id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="flex h-fit items-center justify-center rounded-full bg-primary p-2 text-white shadow-xl"
        title="Remove"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpen(true);
        }}
        type="button"
      >
        <DeleteIcon className="h-4 w-4" />
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
  const router = useRouter();
  const [removeOpen, setRemoveOpen] = React.useState(false);

  return (
    <div className="relative">
      <Link href={`${!userSide ? "/admin" : ""}/blogs/${post.id}`}>
        <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <p className="text-muted-foreground">{post.content.substring(0, Math.min(post.content.length, 20))}...</p> */}
          </CardContent>
        </Card>
      </Link>
      {!userSide && (
        <section className="absolute right-4 top-4 z-50 grid grid-cols-1 items-center gap-1 bg-transparent  sm:gap-2">
          <RemoveModal id={post.id} open={removeOpen} setOpen={setRemoveOpen} setReloadKey={setReloadKey} />
        </section>
      )}
    </div>
  );
};

export default BlogNode;
