"use client";

import { Input, InputProps } from "./input";
import { ChangeEvent, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ErrorBoundary } from "../errorBoundary";

export type FormImageUploaderProps = InputProps & {
  value?: string;
  setFormValue?: (value: string) => void;
};

function ImageUploader(props: FormImageUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [imageRemoteUrl, setImageRemoteUrl] = useState<string>(props.value || String(props.defaultValue) || "");

  const uploadToCloudinary = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      setImageRemoteUrl(data.secure_url);
      if (props.setFormValue) {
        props.setFormValue(data.secure_url);
      }
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {loading ? (
        <div className="">Uploading . . .</div>
      ) : imageRemoteUrl ? (
        <ErrorBoundary fallback={null}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="max-h-44" src={imageRemoteUrl} alt="Input image" />
        </ErrorBoundary>
      ) : null}

      <Input type="hidden" {...props} value={imageRemoteUrl} />

      <Input
        type="file"
        disabled={loading}
        onChange={uploadToCloudinary}
        className={twMerge("flex-grow", props.className)}
      />
    </div>
  );
}

export const FormImageUploader = forwardRef(ImageUploader);
