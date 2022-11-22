<template>
  <div class="container flex flex-col gap-9 py-9">
    <header class="flex items-center justify-between">
      <h1 class="text-4xl font-extrabold tracking-tighter">{{ event?.title }}</h1>
    </header>
    <div class="grid gap-4 grid-cols-2">
      <!-- Rounds -->
      <Card size="sm">
        <template #header>
          <div class="flex items-center">
            <h2 class="grow text-xl font-bold tracking-tighter">Rounds</h2>
            <Button variant="indigo" to="/rounds/add" size="sm">
              <PlusIcon />
              <span>Add round</span>
            </Button>
          </div>
        </template>
        <CrudTable
          :items="rounds || []"
          :idKey="'id'"
          :titleKey="'title'"
          :fields="['date']"
          :emptyMessage="'No rounds yet'"
          :baseUrl="'rounds'"
        />
      </Card>

      <!-- Participants -->
      <Card size="sm">
        <template #header>
          <div class="flex items-center">
            <h2 class="grow text-xl font-bold tracking-tighter">Participants</h2>
            <Button variant="indigo" to="/participants/add" size="sm">
              <PlusIcon />
              <span>Add participant</span>
            </Button>
          </div>
        </template>
        <CrudTable
          :items="rounds || []"
          :idKey="'id'"
          :titleKey="'title'"
          :fields="['date']"
          :emptyMessage="'No participants yet'"
          :baseUrl="'participants'"
        />
      </Card>
    </div>
  </div>
</template>

<script async setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/outline";
import Card from "~~/components/Card/Card.vue";
import { useGetRounds } from "~~/composables/useRounds";

definePageMeta({
  title: "Events",
});

const route = useRoute();

const idOption = { id: route.params.eventId as string };
const { data: event, suspense: eventSuspense } = useGetEventById(idOption);
const { data: rounds, suspense: roundsSuspense } = useGetRounds(
  { eventId: idOption.id },
  {
    enabled: computed(() => !!event.value),
  }
);
await Promise.all([eventSuspense, roundsSuspense]);
</script>

<style scoped>
.grid {
  grid-template-columns: 2fr 1fr;
}
</style>
