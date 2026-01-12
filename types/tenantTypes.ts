import { z } from "zod";

export const tenantSchema = z.object({
  name: z.string(),
  moveInDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
});
