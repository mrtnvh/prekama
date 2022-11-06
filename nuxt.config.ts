export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
    },
  },
  typescript: {
    strict: true,
  },
});
