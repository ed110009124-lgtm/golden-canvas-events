import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { cloudflareVitePlugin } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    cloudflareVitePlugin({
      serverEntry: "src/server.ts",
    }),
    tanstackStart({
      server: { entry: "server" },
    }),
    tsConfigPaths(),
    tailwindcss(),
    viteReact({ jsxImportSource: "react" }),
  ],
});
