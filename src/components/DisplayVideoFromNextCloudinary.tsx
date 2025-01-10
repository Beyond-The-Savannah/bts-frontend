'use client'

import { CldVideoPlayer } from "next-cloudinary"
import 'next-cloudinary/dist/cld-video-player.css';

interface videoProps{
    src:string,
    width:number,
    height:number,
    classname?:string
}

export default function DisplayVideoFromNextCloudinary({src, width, height,classname}:videoProps) {
  return (
    <CldVideoPlayer
        src={src}
        height={height}
        width={width}
        className={classname}
    />
  )
}
