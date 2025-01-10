"use client";
import { CldImage } from "next-cloudinary";

interface ImageProps {
  src: string;
  height: number;
  width: number;
  prioty?: boolean;
  alt: string;
  classname?: string;
}
export default function DisplayImageFromNextCloudinary({
  src,
  height,
  width,
  alt,
  classname,
}: ImageProps) {
  return (
    <CldImage
      src={src}
      height={height}
      width={width}
      priority
      alt={alt}
      className={classname}
    />
  );
}
