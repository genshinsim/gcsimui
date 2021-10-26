import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";
import path from "path";
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    vite: {
      resolve: {
        alias: {
          // these are the aliases and paths to them
          "@components": path.resolve("./src/components"),
          "@src": path.resolve("./src/"),
          "@node_modules": path.resolve("./node_modules"),
        },
      },
    },
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "index.html",
    }),
    ssr: false,
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
  },

  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;
