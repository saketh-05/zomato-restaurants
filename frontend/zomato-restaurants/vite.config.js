import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(__dirname, "../../");
// Load the .env file from the root folder
dotenv.config({ path: path.join(envPath, ".env") });
// dotenv.config({ path: path.join(envPath, ".env.development") });

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: "0.0.0.0",
      allowedHosts: ["all"],
      proxy: {
        "/api": {
          target: process.env.API_PROXY_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
