<template>
  <NuxtLink v-if="to" :to="to" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else v-bind="{ type }" :class="classes">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from "vue-router";

interface Props {
  to?: RouteLocationRaw;
  reset?: boolean;
  square?: boolean;
  variant?: "indigo" | "green";
}
const props = withDefaults(defineProps<Props>(), { to: undefined, reset: false, square: false, variant: "indigo" });
const tag = computed(() => (props.to ? "NuxtLink" : "button"));
const type = computed(() => (tag.value === "button" ? "button" : undefined));

const classes = computed(() => ({
  ["inline-flex items-center gap-2 justify-center"]: true,
  ["px-6"]: !props.square,
  ["py-3"]: true,
  ["rounded"]: true,
  [`text-white bg-${props.variant}-700 hover:bg-${props.variant}-600 shadow-lg`]: !props.reset,
  [`hover:text-${props.variant}-800 hover:bg-${props.variant}-100`]: props.reset,
  [`focus:text-${props.variant}-900 focus:bg-${props.variant}-100`]: props.reset,
  [`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${props.variant}-600`]: true,
  ["px-3"]: props.square,
}));
</script>

<style scoped>
:deep(svg) {
  @apply w-5 h-5;
}
</style>
