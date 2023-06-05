

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["eliceproject.s3.amazonaws.com"],
  },
};


module.exports = nextConfig;
