import type { NextConfig } from "next";
import fs from 'fs';
import path from 'path';

//log directory
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  experimental: { 
    instrumentationHook: true 
  },
} as NextConfig;

export default nextConfig;
