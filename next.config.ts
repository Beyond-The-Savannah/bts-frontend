import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports={
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'i.postimg.cc',
      },
      {
        protocol:'https',
        hostname:'www.pexels.com',
      },
      {
        protocol:'https',
        hostname:'images.pexels.com',
      },
      {
        protocol:'https',
        hostname:'julesdb.blob.core.windows.net',
      },
      {
        protocol:'https',
        hostname:'img.clerk.com',
      },
    ]
  }
}

export default nextConfig;
