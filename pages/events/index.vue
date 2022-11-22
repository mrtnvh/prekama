<template>
  <CrudPage title="Events" :spacing="false">
    <template #actions>
      <Button variant="indigo" to="/events/add">
        <PlusIcon />
        <span>Add event</span>
      </Button>
    </template>
    <div class="overflow-x-auto">
      <table v-if="events?.length" class="w-full whitespace-nowrap">
        <tbody>
          <tr v-for="event in events" :key="event.id" tabindex="0" class="focus:outline-none h-20 rounded">
            <td class="text-base font-medium leading-none text-gray-700 pl-9 px-3">
              {{ event.title }}
            </td>
            <td class="px-3">
              {{ formatDate(event.date) }}
            </td>
            <td class="pl-3 pr-6">
              <div class="flex gap-3 items-center justify-end">
                <Button :to="`/events/${event.id}/update`" reset square>
                  <PencilIcon />
                </Button>
                <Button :to="`/events/${event.id}/delete`" variant="red" reset square>
                  <TrashIcon />
                </Button>
                <Button :to="`/events/${event.id}`" reset square>
                  <ArrowRightIcon />
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="text-center text-gray-500 py-24">No events yet</div>
    </div>
  </CrudPage>
</template>

<script async setup lang="ts">
import { PlusIcon, PencilIcon, TrashIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";

definePageMeta({
  title: "Events",
});

const { data: events, suspense } = useGetEvents();
await suspense();
</script>
