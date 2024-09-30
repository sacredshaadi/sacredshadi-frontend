import { ErrorBoundary } from "@/components/errorBoundary";
import Image, { ImageProps } from "next/image";

export function CustomImage({
  fallbackImage = "/favicon.png",
  fallbackStyle,
  ...props
}: ImageProps & { fallbackImage?: string; fallbackStyle?: string }) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <ErrorBoundary fallback={<Image {...props} src="/favicon.png" />}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        {...props}
        onError={(e: any) => {
          e.target.src = fallbackImage;
          e.target.style = fallbackStyle ?? "height: 200px; width: 200px; margin: 20px auto 0px auto;";
        }}
      />
    </ErrorBoundary>
  );
}
