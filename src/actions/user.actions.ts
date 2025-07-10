"use server";

import jwt from "jsonwebtoken";

import { client } from "@/config/db";
import { SignupSchemaType } from "@/lib/types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { generateOTP, getProvider, hashData, sendOTP } from "@/lib/helpers";

export async function signup(payload: SignupSchemaType) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return { error: "Internal server error" };
    }

    payload.password = await hashData(payload.password);
    const response = await client.user.create({
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
        data: response,
      },
    };
  } catch (error) {
    if ((error as PrismaClientKnownRequestError).code === "P2002") {
      return { error: "Account already exist" };
    }
    return { error: "Something went wrong" };
  }
}
