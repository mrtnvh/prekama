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
  variant?: "gray" | "indigo" | "green" | "red";
  size?: "xs" | "sm" | "md" | "lg";
}
const props = withDefaults(defineProps<Props>(), { to: undefined, reset: false, square: false, variant: "gray" });
const tag = computed(() => (props.to ? "NuxtLink" : "button"));
const type = computed(() => (tag.value === "button" ? "button" : undefined));

const getSize = (size: Props["size"]) => {
  switch (size) {
    case "sm":
      return {
        "py-2": true,
        "px-2": props.square,
        "px-4": !props.square,
      };
    case "xs":
      return {
        "py-2": true,
        "px-2": props.square,
        "px-4": !props.square,
        "gap-2": true,
        "text-sm": true,
      };
    case "lg":
      return {
        "py-4": true,
        "px-4": props.square,
        "px-8": !props.square,
      };
    default:
      return {
        "py-3": true,
        "px-3": props.square,
        "px-6": !props.square,
      };
  }
};

const getVariant = (variant: Props["variant"]) => {
  switch (variant) {
    case "indigo":
      return {
        [`text-white bg-indigo-700 hover:bg-indigo-600`]: !props.reset,
        [`hover:text-indigo-800 hover:bg-indigo-100`]: props.reset,
        [`focus:text-indigo-900 focus:bg-indigo-100`]: props.reset,
        [`focus:ring-indigo-600`]: true,
      };
    case "green":
      return {
        [`text-white bg-green-700 hover:bg-green-600`]: !props.reset,
        [`hover:text-green-800 hover:bg-green-100`]: props.reset,
        [`focus:text-green-900 focus:bg-green-100`]: props.reset,
        [`focus:ring-green-600`]: true,
      };
    case "red":
      return {
        [`text-white bg-red-700 hover:bg-red-600`]: !props.reset,
        [`hover:text-red-800 hover:bg-red-100`]: props.reset,
        [`focus:text-red-900 focus:bg-red-100`]: props.reset,
        [`focus:ring-red-600`]: true,
      };
    default:
      return {
        [`text-white bg-gray-700 hover:bg-gray-600`]: !props.reset,
        [`hover:text-gray-800 hover:bg-gray-100`]: props.reset,
        [`focus:text-gray-900 focus:bg-gray-100`]: props.reset,
        [`focus:ring-gray-600`]: true,
      };
  }
};

const classes = computed(() => ({
  ["inline-flex items-center justify-center"]: true,
  ["rounded"]: true,
  ["focus:outline-none focus:ring-2 focus:ring-offset-2"]: true,
  ["shadow-lg"]: !props.reset,
  ...getVariant(props.variant),
  ...getSize(props.size),
}));
</script>

<style scoped>
:deep(svg) {
  @apply w-5 h-5;
}
</style>
