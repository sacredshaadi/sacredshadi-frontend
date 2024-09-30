"use client";
import { checkToken } from "@/app/_components/functions";
import { useUserStore } from "@/app/context/user-context";
import { useVendorContext } from "@/app/context/vendor-context";
import { useDeleteMediaMutation, useGetAlbumByVendorIdMutation } from "@/components/api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
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
import useStateRef from "react-usestateref";
import { Media } from "@/types/auth.types";
import { cn } from "@/lib/utils";

interface UplodedImagesProps {
  userFacing?: boolean;
  vendorId?: number;
}

const UplodedImages = (props: UplodedImagesProps) => {
  const { vendor, setVendor } = useUserStore();
  const { album, setAlbum } = useVendorContext();
  const [tempAlbum, setTempAlbum] = useState<Media[]>([]);
  const router = useRouter();
  const { mutate: getFn, isPending } = useGetAlbumByVendorIdMutation();
  const { mutate: deleteFn } = useDeleteMediaMutation();
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [, , vendorIdRef] = useStateRef(props.userFacing ? props.vendorId : vendor?.vendorId);
  const [totalImages, setTotalImages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    try {
      if (props.userFacing && !props.vendorId) return;
      if (!vendorIdRef.current) throw new Error("Vendor not found");
      getFn(
        // TODO: make this function paginated
        { vendorId: vendorIdRef.current, page, pageSize: 18 },
        {
          onSuccess: (data) => {
            setTotalImages(data.data.count);
            props.userFacing ? setTempAlbum(data.data.rows) : setAlbum(data.data.rows);
          },
          onError: (error) => {
            throw error;
          }
        }
      );
    } catch (error) {
      toast({ title: "Error", description: "Failed to get images", variant: "destructive" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendorIdRef.current, page]);

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
      {(props.userFacing ? tempAlbum : album).length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {(props.userFacing ? tempAlbum : album).map((file) => (
            <div key={file.id} className="group relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={file.url}
                alt={`${file.id}`}
                className="h-44 w-full rounded-lg object-cover"
                onError={(e: any) => {
                  e.target.src = "/favicon.png";
                  e.target.style = "height: 176px; width: 200px; margin: 20px auto 0px auto;";
                }}
              />
              <Dialog open={delModalOpen} onOpenChange={setDelModalOpen}>
                <DialogTrigger
                  className={cn(
                    "absolute right-2 top-2 h-fit rounded-full bg-white p-3 opacity-50 shadow-md transition group-hover:opacity-100",
                    props.userFacing && "hidden"
                  )}
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
