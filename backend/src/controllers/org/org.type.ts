import { z } from "zod";
import { createOrgSchema } from "./org.schema";

export type CreateOrgRequestBody = z.infer<typeof createOrgSchema>