import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // FILE: next.config.js
  module,exports : {
    experimental: {
      appDir: true,
    },
    env: {
      NEXT_PUBLIC_SUPABASE_URL: "your_supabase_url",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "your_supabase_anon_key",
      SUPABASE_SERVICE_ROLE_KEY: "your_service_role_key",
      CLERK_FRONTEND_API: "your_clerk_frontend_api",
      CLERK_API_KEY: "your_clerk_api_key",
    },
  },
};

export default nextConfig;
