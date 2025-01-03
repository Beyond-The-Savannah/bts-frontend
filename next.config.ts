import type { NextConfig } from "next";

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
    ]
  }
}

export default nextConfig;
