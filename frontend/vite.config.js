const { defineConfig } = require("vite");

module.exports = defineConfig({
  base: "/stellerX/",
  root: "frontend",
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:3001"
    }
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true
  }
});
