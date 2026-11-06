"use client";
import { CldImage } from "next-cloudinary";

interface ImageProps {
  src: string;
  height?: number;
  width?: number;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  loading?: "eager" | "lazy";
  fill?:boolean;
  sizes?:string;
  crop?: "fill" | "fit" | "scale" | "thumb";
  alt: string;
  classname?: string;
}
export default function DisplayImageFromNextCloudinary({
  src,
  height,
  width,
  alt,
  priority,
  fetchPriority,
  loading,
  fill,
  sizes,
  crop,
  classname,
}: ImageProps) {
  return (
    <CldImage
      src={src}
      height={height}
      width={width}
      sizes={sizes}
      priority={priority}
      fetchPriority={fetchPriority}
      loading={loading}
      crop={crop}
      alt={alt}
      className={classname}
      format="webp"
      fill={fill}
    />
  );
}
