import * as trpc from "@trpc/server";
import { z } from "zod";
import { RoundFindManySchema } from "~~/models/db/schemas/findManyRound.schema";
import { RoundCreateInputObjectSchema } from "~~/models/db/schemas/objects/RoundCreateInput.schema";
import { RoundUpdateInputObjectSchema } from "~~/models/db/schemas/objects/RoundUpdateInput.schema";
import { RoundWhereInputObjectSchema } from "~~/models/db/schemas/objects/RoundWhereInput.schema";
import { RoundWhereUniqueInputObjectSchema } from "~~/models/db/schemas/objects/RoundWhereUniqueInput.schema";
import client from "~~/prisma/client";

export const router = trpc
  .router()
  .query("getRounds", {
    input: RoundFindManySchema,
    async resolve(req) {
      return await client.round.findMany(req.input);
    },
  })
  .query("getRoundById", {
    input: RoundWhereUniqueInputObjectSchema,
    async resolve(req) {
      return await client.round.findUnique({
        where: req.input,
      });
    },
  })
  .mutation("createRound", {
    input: RoundCreateInputObjectSchema,
    async resolve(req) {
      return await client.round.create({
        data: req.input,
      });
    },
  })
  .mutation("updateRound", {
    input: z.object({ where: RoundWhereUniqueInputObjectSchema, data: RoundUpdateInputObjectSchema }),
    async resolve(req) {
      return await client.round.update({ where: req.input.where, data: req.input.data });
    },
  })
  .mutation("deleteRound", {
    input: RoundWhereUniqueInputObjectSchema,
    async resolve(req) {
      return await client.round.delete({ where: req.input });
    },
  });
