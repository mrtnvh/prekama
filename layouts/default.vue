<template>
  <div class="min-h-screen flex flex-col">
    <header v-if="pageTitle" class="bg-white border-b-2">
      <div class="container flex items-center">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 py-6">{{ pageTitle }}</h1>
      </div>
    </header>
    <main class="flex flex-col flex-grow">
      <NuxtPage />
    </main>
    <footer></footer>
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


.container {
  @apply mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8;
}
</style>
