// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  colorMode: {
    preference: "light",
  },
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  runtimeConfig: {
    public: {
      api_url: process.env.NUXT_API_URL,
    },
  },
  devServer: {
    host: "127.0.0.1",
    port: 3000,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
