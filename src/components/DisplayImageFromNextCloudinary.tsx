"use client";
import { CldImage } from "next-cloudinary";

interface ImageProps {
  src: string;
  height?: number;
  width?: number;
  priority?: boolean;
  fill?:boolean;
  sizes?:string;
  alt: string;
  classname?: string;
}
export default function DisplayImageFromNextCloudinary({
  src,
  height,
  width,
  alt,
  priority,
  fill,
  sizes,
  classname,
}: ImageProps) {
  return (
    <CldImage
      src={src}
      height={height}
      width={width}
      sizes={sizes}
      priority={priority}
      alt={alt}
      className={classname}
      format="webp"
      fill={fill}
    />
  );
}
