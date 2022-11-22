import { z } from "zod";
import { EventCreateInputObjectSchema } from "../db/schemas/objects/EventCreateInput.schema";
import { EventUpdateInputObjectSchema } from "../db/schemas/objects/EventUpdateInput.schema";

export const EventCreateInputObjectSchemaWithDateString = z.preprocess((args: any) => {
  return {
    ...args,
    date: new Date(args.date),
  };
}, EventCreateInputObjectSchema);

export const EventUpdateInputObjectSchemaWithDateString = z.preprocess((args: any) => {
  return {
    ...args,
    date: new Date(args.date),
  };
}, EventUpdateInputObjectSchema);
