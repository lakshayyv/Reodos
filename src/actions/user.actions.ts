"use server";

import { client } from "@/config/db";
import { FnReturnType, SignupSchemaType } from "@/lib/types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getProvider, hashData, sendOTP } from "@/lib/helpers";

export async function signup(payload: SignupSchemaType): FnReturnType {
  try {
    payload.password = await hashData(payload.password);
    await client.user.create({
      data: payload,
      select: { id: true, email: true },
    });

    const otpResponse = await sendOTP(payload.email);

    if (otpResponse.error) {
      return otpResponse;
    }

    const provider = getProvider(payload.email);
    return {
      data: {
        message: `Verification code sent to ${provider}`,
      },
    };
  } catch (error) {
    if ((error as PrismaClientKnownRequestError).code === "P2002") {
      return { error: "Account already exist" };
    }
    return { error: "Something went wrong" };
  }
}
