/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        // port: "3000",
        pathname: "/public/img/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        // port: "3000",
        pathname: "/perfilcliente/**/**",
      },
      {
        protocol: "https",
        hostname: "nest-image-dev.onrender.com",
        // port: "3000",
        pathname: "/public/img/**",
      },
      {
        protocol: "https",
        hostname: "nest-online-dev.onrender.com",
        // port: "3000",
        pathname: "/public/img/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self';script-src 'none'; sandox;",
  },
  // reactStrictMode: false,
};

module.exports = nextConfig;
