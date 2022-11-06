<template>
  <CrudPageLayout title="Events">
    <template #actions>
      <Button to="/events/add">
        <PlusIcon />
        <span>Add event</span>
      </Button>
    </template>
    <div class="overflow-x-auto">
      <table class="w-full whitespace-nowrap">
        <tbody>
          <tr v-for="event in events" :key="event.id" tabindex="0" class="focus:outline-none h-20 rounded">
            <td class="text-base font-medium leading-none text-gray-700 pl-9 px-3">
              {{ event.name }}
            </td>
            <td class="px-3">
              {{ formatDate(event.date) }}
            </td>
            <td class="pl-3 pr-6">
              <div class="flex gap-3 items-center justify-end">
                <Button :to="`/events/${event.id}`" reset square>
                  <PencilIcon />
                </Button>
                <Button :to="`/events/${event.id}/delete`" variant="red" reset square>
                  <TrashIcon />
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </CrudPageLayout>
</template>

<script setup lang="ts">
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
import CrudPageLayout from "~~/components/Page/CrudPageLayout.vue";

definePageMeta({
  title: "Events",
});

interface Event {
  id: string;
  name: string;
  date: Date;
  state: "pending" | "resolved" | "rejected";
}

const events: Event[] = [
  {
    id: "sfsdfsdf",
    name: "Karaoke Night",
    date: new Date(),
    state: "pending",
  },
];

function formatDate(date: Date) {
  return date.toLocaleDateString("en");
}
</script>
