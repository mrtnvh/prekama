<template>
  <div class="flex flex-col flex-grow relative overflow-hidden bg-white">
    <div class="container flex flex-col flex-grow justify-center">
      <div class="sm:text-center lg:text-left py-40 max-w-[42.25%]">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span class="block xl:inline">PreKaMa</span>
        </h1>
        <p class="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
          The powerpoint karaoke machine
        </p>
        <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div class="rounded-lg shadow-lg">
            <NuxtLink
              to="/events"
              class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-base font-semibold text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
            >
              Get started
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute right-0 top-0 bottom-0 left-[42.25%]">
      <img
        class="object-cover object-center hero-image w-full h-full"
        src="/photo-1505373877841-8d25f7d46678.webp"
        alt=""
      />
    </div>
  </div>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
</script>

<style scoped>
.hero-image {
  clip-path: polygon(25% 0%, 100% 00%, 100% 100%, 0% 100%);
}
</style>
