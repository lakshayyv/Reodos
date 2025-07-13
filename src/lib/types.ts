import z from "zod";
import { SignupSchema } from "./schema";

export type SignupSchemaType = z.infer<typeof SignupSchema>;

export type FnReturnType = Promise<
  | {
      error: string;
      data?: undefined;
    }
  | {
      data: {
        message: string;
      };
      error?: undefined;
    }
>;
