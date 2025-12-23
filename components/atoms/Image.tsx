import NextImage, { ImageProps as NextImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface ImageProps extends Omit<NextImageProps, "src"> {
  src: string;
  alt: string;
  className?: string;
}

export function Image({ src, alt, className, ...props }: ImageProps) {
  return (
    <NextImage
      src={src}
      alt={alt}
      className={cn("object-cover", className)}
      {...props}
    />
  );
}
