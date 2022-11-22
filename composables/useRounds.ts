import type { Round, Prisma } from "@prisma/client";
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/vue-query";
import type { MaybeRef, MaybeComputedRef } from "@vueuse/core";
import defu from "defu";
import { unref } from "vue";
import { z } from "zod";
import { RoundCreateInputObjectSchema } from "~~/models/db/schemas/objects/RoundCreateInput.schema";
import { RoundUpdateInputObjectSchema } from "~~/models/db/schemas/objects/RoundUpdateInput.schema";

const ROUND_QUERY_KEY = "rounds";

function init() {
  const client = useClient();
  const queryClient = useQueryClient();
  return { client, queryClient };
}

export function useGetRounds(
  { eventId }: { eventId?: MaybeRef<Round["eventId"] | undefined> },
  options?: UseQueryOptions<Round[]>
) {
  const { client } = init();
  return useQuery<Round[]>(
    [ROUND_QUERY_KEY],
    () => client.query("rounds.getRounds", { where: { eventId: unref(eventId) } }),
    defu(options, { initialData: [] })
  );
}

export type useGetRoundByIdReturnType = Round | null;

export function useGetRoundById(
  { id }: { id?: MaybeRef<Round["id"] | undefined> },
  options?: UseQueryOptions<useGetRoundByIdReturnType>
) {
  const client = useClient();
  return useQuery<useGetRoundByIdReturnType>(
    [ROUND_QUERY_KEY, id],
    () => client.query("rounds.getRoundById", { id: unref(id) }),
    defu(options, { initialData: null })
  );
}

export function useCreateRound() {
  const { client, queryClient } = init();
  return useMutation(
    ({ data }: { data: z.infer<typeof RoundCreateInputObjectSchema> }) =>
      // @ts-ignore
      client.mutation("createRound", data),
    {
      onSettled() {
        queryClient.invalidateQueries([ROUND_QUERY_KEY]);
      },
    }
  );
}

export function useUpdateRound() {
  const { client, queryClient } = init();
  return useMutation(
    ({ id, data }: { id: MaybeRef<Round["id"] | undefined>; data: z.infer<typeof RoundUpdateInputObjectSchema> }) =>
      client.mutation("rounds.updateRound", { where: { id: unref(id) }, data }),
    {
      onSettled() {
        queryClient.invalidateQueries([ROUND_QUERY_KEY]);
      },
    }
  );
}

export function useDeleteRound() {
  const { client, queryClient } = init();
  return useMutation(
    ({ id }: { id: MaybeRef<Round["id"]> }) => client.mutation("rounds.deleteRound", { id: unref(id) }),
    {
      onSettled() {
        queryClient.invalidateQueries([ROUND_QUERY_KEY]);
      },
    }
  );
}
