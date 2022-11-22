<template>
  <CrudPage title="Edit event">
    <DynamicForm :schema="formSchema" @submit="handleSubmit">
      <template #cancel>
        <Button to="/events" reset>Cancel</Button>
      </template>
    </DynamicForm>
  </CrudPage>
</template>

<script setup lang="ts">
import { z } from "zod";
import { EventUpdateInputObjectSchemaWithDateString } from "~~/models/date/dateString";

definePageMeta({
  title: "Edit event",
});

const router = useRouter();
const route = useRoute();

const routeParamId = computed(() => route.params.eventId as string | undefined);
const {
  data: event,
  isError,
  suspense,
} = useGetEventById({ id: routeParamId }, { enabled: computed(() => !!routeParamId.value) });
const { mutateAsync: updateEvent } = useUpdateEvent();
await suspense();

const formSchema = computed(() => {
  const date = new Date(event.value?.date as unknown as string) || new Date();
  return {
    rules: EventUpdateInputObjectSchemaWithDateString,
    fields: [
      {
        label: "Title",
        name: "title",
        as: "input",
        value: event.value?.title || "",
      },
      {
        label: "Date",
        name: "date",
        as: "input",
        type: "date",
        value: date.toISOString().split("T")[0],
      },
    ],
  };
});

watch(isError, (isError) => {
  if (isError) {
    router.push("/events");
  }
});

async function handleSubmit(values: z.infer<typeof EventUpdateInputObjectSchemaWithDateString>) {
  const mutationValues = EventUpdateInputObjectSchemaWithDateString.parse(values);
  await updateEvent({ id: routeParamId, data: mutationValues });
  await router.push("/events");
}
</script>
