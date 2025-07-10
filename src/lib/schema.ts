import z, { email } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z
    .email({ error: "Enter valid email address" })
    .min(1, "This field is required"),
  password: z
    .string()
    .min(1, "This field is required")
    .min(8, "Password must contain minimum 8 characters"),
});
