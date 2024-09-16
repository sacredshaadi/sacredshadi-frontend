"use server";

import { FileWithPreview } from "../_components/dnd-uploader";

export const uploadImagesToCloudinary = async (files: FileWithPreview[]) => {
  try {
    const promiseArr = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "sacredshadi_unsigned");
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      return data.secure_url as string;
    });
    return await Promise.all(promiseArr);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
