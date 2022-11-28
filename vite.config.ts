import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "types": path.resolve(__dirname, "./src/types.d.ts"), //eslint-disable-line
      "index": path.resolve(__dirname, "./src/index.ts"), //eslint-disable-line
    },
  },
  plugins: [
    react(),
    // react({
    //   babel: {
    //     plugins: ["@emotion"],
    //   },
    // }),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
});
