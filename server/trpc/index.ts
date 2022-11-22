import * as trpc from "@trpc/server";
import { router as events } from "./events";
import { router as rounds } from "./rounds";

export const router = trpc.router().merge("events.", events).merge("rounds.", rounds);
