import { defineConfig } from "vite"; //eslint-disable-line
import react from "@vitejs/plugin-react"; //eslint-disable-line
// import reactRefresh from "@vitejs/plugin-react-refresh"; //eslint-disable-line
// import reactSvgPlugin from "vite-plugin-react-svg"; //eslint-disable-line
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
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
