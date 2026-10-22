import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old URLs from the CMS-driven version of the site.
  async redirects() {
    return [
      { source: "/project", destination: "/projects", permanent: true },
      { source: "/contacts", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
