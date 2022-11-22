<template>
  <CrudPage title="Delete event">
    <form @submit.prevent="handleSubmit">
      <p class="mb-5">
        Are you sure you want to delete
        <strong class="text-red">{{ event?.title }}</strong>
        ?
      </p>
      <Button variant="red" type="submit">Delete</Button>
      <Button to="/events" reset>Cancel</Button>
    </form>
  </CrudPage>
</template>

<script async setup lang="ts">
definePageMeta({
  title: "Delete an event",
});

const route = useRoute();
const router = useRouter();
const idOption = { id: route.params.eventId as string };
const { data: event, suspense } = useGetEventById(idOption);
const { mutateAsync: deleteEvent } = useDeleteEvent();

suspense();

watch(event, (value) => {
  if (!value) throw createError({ statusCode: 404, message: "Event not found" });
});

async function handleSubmit() {
  await deleteEvent(idOption);
  await router.push("/events");
}
</script>
