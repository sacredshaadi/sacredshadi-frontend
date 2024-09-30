import { ErrorBoundary } from "@/components/errorBoundary";
import Image, { ImageProps } from "next/image";
import { CSSProperties } from "react";

export function CustomImage({
  fallbackImage = "/favicon.png",
  fallbackStyle,
  fallbackStyleObject,
  ...props
}: ImageProps & { fallbackImage?: string; fallbackStyle?: string; fallbackStyleObject?: CSSProperties }) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <ErrorBoundary fallback={<Image {...props} src="/favicon.png" style={fallbackStyleObject || {}} />}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        {...props}
        onError={(e: any) => {
          e.target.src = fallbackImage;
          e.target.style = fallbackStyle
            ? fallbackStyle
            : "height: 200px; width: 200px; margin: 20px auto 0px auto; opacity:0.5;";
        }}
      />
    </ErrorBoundary>
  );
}
