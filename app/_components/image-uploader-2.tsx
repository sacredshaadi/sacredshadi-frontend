"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

export default function ImageUploader2() {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mx-auto h-full w-full">
      {image ? (
        <div className="relative h-full ">
          <img src={image} alt="Uploaded image" className="rounded-lg object-cover shadow-md" />
          <Button
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2"
            onClick={handleRemoveImage}
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          onClick={handleAreaClick}
          className="flex h-full cursor-pointer items-center justify-center rounded-lg bg-gray-100 p-6 transition-colors hover:bg-gray-200"
          // style={{ aspectRatio: "16/9" }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            ref={fileInputRef}
            aria-label="Upload image"
          />
          <Camera className="h-12 w-12 text-gray-400" aria-hidden="true" />
          <span className="sr-only">Click to upload an image</span>
        </div>
      )}
    </div>
  );
}
