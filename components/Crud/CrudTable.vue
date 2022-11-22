<template>
  <div class="overflow-x-auto">
    <table v-if="items?.length" class="w-full whitespace-nowrap">
      <tbody>
        <tr v-for="item in items" :key="item[idKey]" tabindex="0" class="focus:outline-none h-20 rounded">
          <!-- Title -->
          <td class="text-base font-medium leading-none text-gray-700 pl-9 px-3">
            {{ item[titleKey] }}
          </td>

          <!-- Loop other fields -->
          <td v-for="field in fields" :key="field" class="px-3">
            <slot v-if="!!$slots[field]" :name="field" item />
            <template v-else>
              {{ formatField(item[field]) }}
            </template>
          </td>

          <!-- Actions -->
          <td class="pl-3 pr-6">
            <div class="flex gap-3 items-center justify-end">
              <slot v-if="!!$slots.actions" name="actions" item />
              <template v-else>
                <Button :to="`/${baseUrl}/${item[idKey]}/update`" reset square>
                  <PencilIcon />
                </Button>
                <Button :to="`/${baseUrl}/${item[idKey]}/delete`" variant="red" reset square>
                  <TrashIcon />
                </Button>
                <Button :to="`/${baseUrl}/${item[idKey]}`" reset square>
                  <ArrowRightIcon />
                </Button>
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-center text-gray-500 py-24">{{ emptyMessage }}</div>
  </div>
</template>

<script async setup lang="ts">
import { PencilIcon, TrashIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";

interface Props {
  items: any[];
  idKey: string;
  titleKey: string;
  fields: string[];
  emptyMessage: string;
  baseUrl: string;
}

const props = withDefaults(defineProps<Props>(), {
  idKey: "id",
  titleKey: "title",
  fields: () => [],
  emptyMessage: "No items yet",
});

const fields = computed(() => {
  return props.fields.filter((field) => {
    if (field === props.idKey || field === props.titleKey) {
      return false;
    }
  });
});

const formatField = (value: any) => {
  if (value instanceof Date) {
    return formatDate(value);
  }
  return value;
};
</script>
