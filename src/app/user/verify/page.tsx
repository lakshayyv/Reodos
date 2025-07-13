"use client";

import { resend } from "@/actions/email.actions";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useTimer } from "@/hooks/use-timer";
import { COOLDOWN_EXPIRY } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const params = useSearchParams();
  const email = params.get("email");

  if (!email) {
    return;
  }

  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { seconds, isActive, trigger } = useTimer(COOLDOWN_EXPIRY);

  const handleChange = (e: string) => {
    if (error) {
      setError(false);
    }
    if (message) {
      setMessage("");
    }
    if (e && !/^\d+$/.test(e)) {
      setError(true);
      setMessage("Verification code must be a number");
    }
    setOtp(e);
  };

  const handleClick = () => {
    if (otp.length < 6) {
      setError(true);
      setMessage("Your code must be 6 characters");
    }
  };

  const handleResend = async () => {
    const response = await resend(email);
    if (response.error) {
      setError(true);
      toast.error(response.error);
    }
    if (response.data) {
      toast.success(response.data.message);
      trigger();
    }
  };

  return (
    <div className="max-w-1/4 space-y-7">
      <div
        onClick={() => router.back()}
        className="space-x-3 cursor-pointer hover:text-primary"
      >
        <span>&larr;</span>
        <span className="text-primary font-medium">Back</span>
      </div>

      <div className="font-semibold space-y-3">
        <h1 className="text-3xl">You&apos;re Almost In</h1>
        <p className="text-neutral-500 text-balanced">
          Enter the code we sent to your email to verify and continue.
        </p>
      </div>
      <div className="space-y-1">
        <InputOTP value={otp} onChange={handleChange} maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot error={error} index={0} />
            <InputOTPSlot error={error} index={1} />
            <InputOTPSlot error={error} index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot error={error} index={3} />
            <InputOTPSlot error={error} index={4} />
            <InputOTPSlot error={error} index={5} />
          </InputOTPGroup>
        </InputOTP>
        {message && <p className="text-center text-destructive">{message}</p>}
      </div>
      <div>
        <Button type="button" onClick={handleClick}>
          Verify
        </Button>
        <Button disabled={isActive} variant="link" onClick={handleResend}>
          Resend code {isActive && `in ${seconds}s`}
        </Button>
      </div>
    </div>
  );
}
