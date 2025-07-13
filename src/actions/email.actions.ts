"use server";

import { sendOTP } from "@/lib/helpers";

export async function resend(email: string) {
  return await sendOTP(email);
}
