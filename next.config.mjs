/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "img-demo-next-dev.s3.amazonaws.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "img-demo-next-dev.s3.ap-southeast-1.amazonaws.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "jdjr-prod-next-image.s3.ap-southeast-1.amazonaws.com",
        pathname: "**"
      }
    ]
  }
};

export default nextConfig;
