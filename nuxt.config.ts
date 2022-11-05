export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      "Albert Sans": true,
    },
  },
  typescript: {
    strict: true,
  },
});
