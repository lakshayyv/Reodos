import bcrypt from "bcrypt";
import { COOLDOWN_EXPIRY, OTP_EXPIRY, SALT_ROUNDS } from "./constants";
import { redis } from "@/stores/redis";
import { sendMail } from "./mailer";
import { FnReturnType } from "./types";

export function getProvider(email: string) {
  const provider = email.split("@")[1].split(".")[0];
  return provider ? provider : "email";
}

export function generateOTP() {
  return 100000 + Math.floor(Math.random() * 900000);
}

export async function hashData(password: string) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function sendOTP(email: string): FnReturnType {
  const cooldown = await redis.get(`cooldown:${email}`);
  if (cooldown) {
    return { error: "Wait before requesting again" };
  }

  const otp = generateOTP().toString();
  const hash = await hashData(otp);
  await redis.set(`otp:${email}`, hash, { ex: OTP_EXPIRY });
  await redis.set(`cooldown:${email}`, 1, { ex: COOLDOWN_EXPIRY - 1 });

  const provider = getProvider(email);
  const response = await sendMail(email, otp);

  if (response.error) {
    return response;
  }

  return { data: { message: `Verification code sent to ${provider}` } };
}
