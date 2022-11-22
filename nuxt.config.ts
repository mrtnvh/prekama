export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "trpc-nuxt", "@vueuse/nuxt"],
  trpc: {
    baseURL: "", // Set empty string (default) to make requests by relative address
    endpoint: "/trpc", // defaults to /trpc
    installPlugin: true, // defaults to true. Add @trpc/client plugin and composables
  },
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
    },
  },
  typescript: {
    strict: true,
  },
});
