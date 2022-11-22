<template>
  <div class="min-h-screen flex flex-col">
    <header v-if="pageTitle">
      <div class="container flex items-center">
        <NuxtLink to="/" class="py-6 flex items-center gap-3 text-indigo-500">
          <svg viewBox="0 0 256 256" class="h-10">
            <path
              fill="currentColor"
              d="M232 56v120a16 16 0 0 1-16 16h-39.4l21.6 27a8 8 0 0 1-6.2 13a7.8 7.8 0 0 1-6.2-3l-29.6-37H99.8l-29.6 37a7.8 7.8 0 0 1-6.2 3a8 8 0 0 1-6.2-13l21.6-27H40a16 16 0 0 1-16-16V56a16 16 0 0 1 16-16h80V24a8 8 0 0 1 16 0v16h80a16 16 0 0 1 16 16Z"
            />
          </svg>
          <div class="uppercase text-xl font-black">PreKaMa</div>
        </NuxtLink>
      </div>
    </header>
    <main class="flex flex-col flex-grow">
      <NuxtPage />
    </main>
    <footer v-if="pageTitle" class="flex py-6 items-center justify-center">
      <div class="text-gray-500 text-sm">
        <span>© {{ new Date().getFullYear() }} PreKaMa</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
const router = useRouter();
const pageMeta = computed(() => {
  const { title } = router.currentRoute.value.meta;
  return {
    title,
  };
});
const pageTitle = computed(() => pageMeta.value.title);

useHead({
  htmlAttrs: {
    lang: "en",
    class: "font-sans antialiased h-full bg-gray-100 font-medium",
  },
  bodyAttrs: {
    class: "h-full",
  },
});
</script>

<style>

</style>
