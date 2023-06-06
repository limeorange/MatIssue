/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "eliceproject.s3.amazonaws.com",
      "eliceproject.s3.ap-northeast-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
