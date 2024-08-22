"use client";

import { Input, InputProps } from "./input";
import { ChangeEvent, ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";
import { twMerge } from "tailwind-merge";

export type FormImageUploaderProps = InputProps & {
  value?: string;
};

function ImageUploader(props: FormImageUploaderProps, ref: ForwardedRef<{ getValue: () => string }>) {
  const [loading, setLoading] = useState(false);
  const [imageRemoteUrl, setImageRemoteUrl] = useState<string>(props.value || "");

  useImperativeHandle(ref, () => ({
    getValue: () => imageRemoteUrl
  }));

  const uploadToCloudinary = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "sacredshadi_unsigned");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      setImageRemoteUrl(data.secure_url);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {loading ? (
        <div className="">Loading...</div>
      ) : imageRemoteUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="max-h-44" src={imageRemoteUrl} alt="Input image" />
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
