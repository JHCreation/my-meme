import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { cjsInterop } from "vite-plugin-cjs-interop";

export default defineConfig({
  /* ssr: {
    noExternal: ['@material-tailwind']
  }, */
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    cjsInterop({
      // List of CJS dependencies that require interop
      dependencies: [
        // "@material-tailwind",
        // "@material-tailwind/react",
        // "@material-tailwind/import",
        // "@material-tailwind/react/*",
        "@material-tailwind/*",
      ],
    }),
  ],
  // server: {
  //   port: 3000
  // },
  legacy: { proxySsrExternalModules: true },
  esbuild: {
    // pure: process.env.NODE_ENV === 'production' ? ['console.log'] : [],
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  
});

declare global {
  interface Window {
      ENV: any;
  }
}