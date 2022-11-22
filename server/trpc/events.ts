import * as trpc from "@trpc/server";
import { z } from "zod";
import {
  EventCreateInputObjectSchemaWithDateString,
  EventUpdateInputObjectSchemaWithDateString,
} from "~~/models/date/dateString";
import { EventWhereUniqueInputObjectSchema } from "~~/models/db/schemas/objects/EventWhereUniqueInput.schema";
import client from "~~/prisma/client";

export const router = trpc
  .router()
  .query("getEvents", {
    async resolve(req) {
      return await client.event.findMany();
    },
  })
  .query("getEventById", {
    input: EventWhereUniqueInputObjectSchema,
    async resolve(req) {
      return await client.event.findUnique({
        where: req.input,
      });
    },
  })
  .mutation("createEvent", {
    input: EventCreateInputObjectSchemaWithDateString,
    async resolve(req) {
      return await client.event.create({
        data: req.input,
      });
    },
  })
  .mutation("updateEvent", {
    input: z.object({ where: EventWhereUniqueInputObjectSchema, data: EventUpdateInputObjectSchemaWithDateString }),
    async resolve(req) {
      return await client.event.update({ where: req.input.where, data: req.input.data });
    },
  })
  .mutation("deleteEvent", {
    input: EventWhereUniqueInputObjectSchema,
    async resolve(req) {
      return await client.event.delete({ where: req.input });
    },
  });
