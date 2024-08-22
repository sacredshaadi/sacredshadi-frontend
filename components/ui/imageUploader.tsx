import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./button";
import { Input, InputProps } from "./input";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export type FormImageUploaderProps = InputProps & {};

export function FormImageUploader(props: FormImageUploaderProps) {
  const [inputValue, setInputValue] = useState(props.value || "");

  return (
    <div className="flex items-center gap-4">
      <Input disabled value={inputValue} {...props} className={twMerge("flex-grow", props.className)} />

      <CldUploadWidget
        config={{
          cloud: {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            apiSecret: process.env.CLOUDINARY_API_SECRET
          },
          url: {
            signUrl: true
          }
        }}
        uploadPreset="ynppe6iu"
        onPublicIdAction={(publicIdActionRes) => {
          console.log({ publicIdActionRes });
        }}
        onUploadAddedAction={(uploadAddedRes) => {
          console.log({ uploadAddedRes });
        }}
        onUploadAdded={(uploadAddedRes) => {
          console.log({ uploadAddedRes });
        }}
      >
        {({ open }) => {
          return (
            <Button variant="outline" type="button" onClick={() => open()}>
              Upload
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
