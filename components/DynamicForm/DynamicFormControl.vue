<template>
  <component
    :is="as"
    :id="name"
    :type="type || 'text'"
    v-bind="{ ...field }"
    :class="{
      'focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none': true,
      'border-red-500': hasErrors,
      'form-control block w-full px-4 py-3': true,
      'text-base font-normal text-gray-700': true,
      'bg-white bg-clip-padding': true,
      'border border-solid border-gray-300 rounded': true,
      'transition ease-in-out': true,
      'm-0': true,
    }"
  >
    <component v-for="({ tag, text, ...childAttrs }, idx) in children" :key="idx" :is="tag" v-bind="childAttrs">
      {{ text }}
    </component>
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    field?: any;
    as: string;
    name: string;
    type?: string;
    value?: string;
    hasErrors?: boolean;
    children?: {
      tag: string;
      text: string;
      [key: string]: any;
    }[];
  }>(),
  {
    as: "input",
    name: "",
    type: "text",
    value: "",
    hasErrors: false,
  }
);
</script>
