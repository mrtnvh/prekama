<template>
  <div class="bg-white rounded-lg shadow-xl" :class="classes">
    <slot name="header" />
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), { size: "md" });

const getSize = (size: Props["size"]) => {
  switch (size) {
    case "sm":
      return {
        "p-4 md:p-8": true,
      };
    case "lg":
      return {
        "p-12": true,
      };
    default:
      return {
        "p-6 md:p-12": true,
      };
  }
};

const classes = computed(() => ({
  ...getSize(props.size),
}));
</script>
