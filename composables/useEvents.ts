import type { Event, Prisma } from "@prisma/client";
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/vue-query";
import type { MaybeRef, MaybeComputedRef } from "@vueuse/core";
import defu from "defu";
import { unref } from "vue";
import { z } from "zod";
import {
  EventCreateInputObjectSchemaWithDateString,
  EventUpdateInputObjectSchemaWithDateString,
} from "~~/models/date/dateString";

const EVENT_QUERY_KEY = "events";

function init() {
  const client = useClient();
  const queryClient = useQueryClient();
  return { client, queryClient };
}

export function useGetEvents() {
  const { client } = init();
  return useQuery([EVENT_QUERY_KEY], () => client.query("events.getEvents"), { initialData: [] });
}

export type useGetEventByIdReturnType = Event | null;

export function useGetEventById(
  { id }: { id?: MaybeRef<Event["id"] | undefined> },
  options?: UseQueryOptions<useGetEventByIdReturnType>
) {
  const client = useClient();
  return useQuery<useGetEventByIdReturnType>(
    [EVENT_QUERY_KEY, id],
    () => client.query("events.getEventById", { id: unref(id) }),
    defu(options, { initialData: null })
  );
}

export function useCreateEvent() {
  const { client, queryClient } = init();
  return useMutation(
    ({ data }: { data: z.infer<typeof EventCreateInputObjectSchemaWithDateString> }) =>
      // @ts-ignore
      client.mutation("events.createEvent", data),
    {
      onSettled() {
        queryClient.invalidateQueries([EVENT_QUERY_KEY]);
      },
    }
  );
}

export function useUpdateEvent() {
  const { client, queryClient } = init();
  return useMutation(
    ({
      id,
      data,
    }: {
      id: MaybeRef<Event["id"] | undefined>;
      data: z.infer<typeof EventUpdateInputObjectSchemaWithDateString>;
    }) => client.mutation("events.updateEvent", { where: { id: unref(id) }, data }),
    {
      onSettled() {
        queryClient.invalidateQueries([EVENT_QUERY_KEY]);
      },
    }
  );
}

export function useDeleteEvent() {
  const { client, queryClient } = init();
  return useMutation(({ id }: { id: MaybeRef<Event["id"]> }) => client.mutation("events.deleteEvent", { id: unref(id) }), {
    onSettled() {
      queryClient.invalidateQueries([EVENT_QUERY_KEY]);
    },
  });
}
