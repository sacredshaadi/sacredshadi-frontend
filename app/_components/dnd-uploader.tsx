"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { put } from "@vercel/blob";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

type FileWithPreview = File & { preview: string };

export default function DndUploader() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadStatus, setUploadStatus] = useState<{ [key: string]: "success" | "error" | null }>({});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": []
    },
    multiple: true
  });

  const uploadToCloudinary = async () => {
    try {
      setUploading(true);
      const promiseArr = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "sacredshadi_unsigned");
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        return data.secure_url;
      });
      const remoteUrls = await Promise.all(promiseArr);
      console.log("Remote URLs", remoteUrls);
    } catch (err: any) {
      console.log(err);
      toast({ title: "Error", description: "Failed to upload files", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center ${
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold">Selected Files:</h2>
          <div className="grid grid-cols-2 gap-4">
            {files.map((file) => (
              <div key={file.name} className="relative">
                {file.type.startsWith("image/") ? (
                  <img src={file.preview} alt={file.name} className="h-40 w-full rounded-lg object-cover" />
                ) : (
                  <video src={file.preview} className="h-40 w-full rounded-lg object-cover" />
                )}
                <p className="mt-2 truncate text-sm">{file.name}</p>
                {uploadProgress[file.name] !== undefined && (
                  <Progress value={uploadProgress[file.name]} className="mt-2" />
                )}
                {uploadStatus[file.name] && (
                  <div
                    className={`absolute right-2 top-2 rounded-full p-1 ${
                      uploadStatus[file.name] === "success" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {uploadStatus[file.name] === "success" ? "✓" : "✗"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {files.length > 0 && (
        <Button onClick={uploadToCloudinary} disabled={uploading} className="mt-4" type="button">
          {uploading ? "Uploading..." : "Upload Files"}
        </Button>
      )}
    </div>
  );
}
