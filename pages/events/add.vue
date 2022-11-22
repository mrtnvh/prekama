<template>
  <CrudPage title="Add an event">
    <DynamicForm :schema="formSchema" @submit="handleSubmit">
      <template #cancel>
        <Button to="/events" reset>Cancel</Button>
      </template>
    </DynamicForm>
  </CrudPage>
</template>

<script setup lang="ts">
import { z } from "zod";
import { EventCreateInputObjectSchemaWithDateString } from "~~/models/date/dateString";

definePageMeta({
  title: "Add an event",
});

const router = useRouter();
const { mutateAsync: createEvent } = useCreateEvent();

const formSchema = computed(() => {
  return {
    rules: EventCreateInputObjectSchemaWithDateString,
    fields: [
      {
        label: "Title",
        name: "title",
        as: "input",
      },
      {
        label: "Date",
        name: "date",
        as: "input",
        type: "date",
        value: new Date().toISOString().split("T")[0],
      },
    ],
  };
});

async function handleSubmit(values: z.infer<typeof EventCreateInputObjectSchemaWithDateString>) {
  const mutationValues = EventCreateInputObjectSchemaWithDateString.parse(values);
  await createEvent({ data: mutationValues });
  await router.push("/events");
}
</script>
