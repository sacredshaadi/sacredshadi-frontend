"use client";
import { checkToken } from "@/app/_components/functions";
import { useUserStore } from "@/app/context/user-context";
import { useVendorContext } from "@/app/context/vendor-context";
import { useDeleteMediaMutation, useGetAlbumByVendorIdMutation } from "@/components/api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

const UplodedImages = () => {
  const { vendor, setVendor } = useUserStore();
  const { album, setAlbum } = useVendorContext();
  const router = useRouter();
  const { mutate: getFn, isPending } = useGetAlbumByVendorIdMutation();
  const { mutate: deleteFn } = useDeleteMediaMutation();
  const [delModalOpen, setDelModalOpen] = React.useState(false);

  useEffect(() => {
    try {
      if (!vendor?.vendorId) throw new Error("Vendor not found");
      getFn(vendor?.vendorId, {
        onSuccess: (data) => {
          setAlbum(data.data);
        },
        onError: (error) => {
          throw error;
        }
      });
    } catch (error) {
      toast({ title: "Error", description: "Failed to get images", variant: "destructive" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor]);

  const deleteImg = useCallback(
    (id: number) => {
      try {
        checkToken(vendor, setVendor, router);
        deleteFn(
          {
            accessToken: vendor?.tokens.accessToken || "",
            data: { id }
          },
          {
            onSuccess: (data) => {
              setAlbum(album.filter((item) => item.id !== id));
              toast({ title: "Success", description: data.message, variant: "default" });
              setDelModalOpen(false);
            },
            onError: (error) => {
              throw error;
            }
          }
        );
      } catch (err) {
        toast({ title: "Error", description: "Failed to delete image", variant: "destructive" });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [album]
  );

  if (isPending) {
    return (
      <Skeleton className="grid grid-cols-1 gap-4 bg-white md:grid-cols-2 2xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <div key={i} className="h-44 w-full rounded-lg bg-gray-200" />
        ))}
      </Skeleton>
    );
  }

  return (
    <div>
      {album.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {album.map((file) => (
            <div key={file.id} className="group relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={file.url} alt={`${file.id}`} className="h-44 w-full rounded-lg object-cover" />
              <Dialog open={delModalOpen} onOpenChange={setDelModalOpen}>
                <DialogTrigger
                  className="absolute right-2 top-2 h-fit rounded-full bg-white p-3
                  opacity-50 shadow-md transition group-hover:opacity-100"
                  type="button"
                >
                  <Trash className="h-4 w-4" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete this image from your profile.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="secondary"
                      onClick={() => setDelModalOpen(false)}
                      className="font-semibold shadow-lg"
                    >
                      No, keep it
                    </Button>
                    <Button onClick={() => deleteImg(file.id)} type="submit" className="font-semibold shadow-lg">
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-lg bg-muted text-xl font-semibold text-gray-500 md:text-4xl">
          <span className="m-auto font-bold drop-shadow-lg">No images found</span>
        </div>
      )}
    </div>
  );
};

export default UplodedImages;
