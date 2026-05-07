"use client";

import "../sign-up/sign-up.css"; // adjust path based on your folder structure
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/app/types/ApiResponse";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();

  // On mount, check sessionStorage has the pending signup data
  useEffect(() => {
    const raw = sessionStorage.getItem("signup_pending");
    if (!raw) {
      // No data found — user navigated here directly, send back
      toast.error("Session expired. Please sign up again.");
      router.replace("/sign-up");
      return;
    }
    const { email } = JSON.parse(raw);
    // Mask email: jo**@example.com
    const [user, domain] = email.split("@");
    setMaskedEmail(`${user.slice(0, 2)}**@${domain}`);
  }, [router]);

  const onCreateAccount = async () => {
    if (!otp || otp.length < 6) {
      toast.error("Please enter a valid OTP.");
      return;
    }

    const raw = sessionStorage.getItem("signup_pending");
    if (!raw) {
      toast.error("Session expired. Please sign up again.");
      router.replace("/sign-up");
      return;
    }

    const { username, email, password } = JSON.parse(raw);
    setIsSubmitting(true);

    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", {
        username,
        email,
        password,
        otp,
      });

      // Clear session data after successful signup
      sessionStorage.removeItem("signup_pending");

      toast.success(response.data.message);
      router.push("/sign-in");
    } catch (error) {
        console.log(error);
        console.log("error");
        
      const axiosError = error as AxiosError<ApiResponse>;
      console.log(axiosError);
      
      toast.error(axiosError?.response?.data.message ?? "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResendOtp = async () => {
    const raw = sessionStorage.getItem("signup_pending");
    if (!raw) return;
    const { email } = JSON.parse(raw);

    setIsResending(true);
    try {
      await axios.post("/api/send-otp", { email });
      toast.success("A new OTP has been sent to your email.");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError?.response?.data.message ?? "Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="signup-page relative min-h-screen bg-black flex items-center justify-center px-4 py-10 overflow-hidden">
      <div className="signup-card relative z-10 w-full max-w-[388px] bg-white/[0.04] border border-white/[0.08] rounded-[22px] px-10 py-11 backdrop-blur-[48px] shadow-[0_40px_80px_rgba(0,0,0,0.7),0_12px_32px_rgba(0,0,0,0.5),inset_0_0_0_0.5px_rgba(255,255,255,0.04)]">

        {/* Apple logo */}
        <div className="signup-logo flex justify-center mb-7 opacity-0">
          <svg viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 fill-white/90">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.8 0 663.5 0 541.6c0-194.3 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
          </svg>
        </div>

        <h1 className="signup-title opacity-0 text-[23px] font-bold tracking-[-0.5px] text-[#f5f5f7] text-center mb-1.5">
          Verify your email
        </h1>
        <p className="signup-sub opacity-0 text-[14px] text-white/40 text-center mb-9 tracking-[0.05px]">
          Enter the code sent to{" "}
          <span className="text-white/60 font-medium">{maskedEmail}</span>
        </p>

        <div className="flex flex-col gap-[14px]">

          {/* OTP Input */}
          <div className="signup-field-1 opacity-0 flex flex-col gap-[7px]">
            <Label htmlFor="otp" className="text-[12px] font-semibold uppercase tracking-[0.6px] text-white/50">
              Verification Code
            </Label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              placeholder="Enter your OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              autoComplete="one-time-code"
              className="h-11 text-[15px] rounded-xl px-3.5 bg-white/[0.06] text-[#f5f5f7] placeholder:text-white/20 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-200 border border-white/10 hover:border-white/15 focus-visible:border-white/25 tracking-[0.2em] text-center font-semibold"
            />
          </div>

          {/* Create Account button */}
          <Button
            onClick={onCreateAccount}
            disabled={isSubmitting || otp.length < 4}
            className="signup-btn opacity-0 mt-2 h-11 w-full bg-white text-black text-[15px] font-bold rounded-xl hover:bg-white/88 active:scale-[0.985] transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {isSubmitting ? "Creating Account…" : "Create Account"}
          </Button>

        </div>

        <div className="signup-divider opacity-0 h-px bg-white/[0.07] my-7" />

        {/* Resend + Back */}
        <div className="signup-footer opacity-0 flex flex-col items-center gap-3">
          <p className="text-[13.5px] text-white/35 text-center">
            Didn't receive a code?{" "}
            <button
              onClick={onResendOtp}
              disabled={isResending}
              className="text-white/70 font-medium hover:text-white transition-colors duration-150 disabled:opacity-40"
            >
              {isResending ? "Sending…" : "Resend OTP"}
            </button>
          </p>
          <Link
            href="/sign-up"
            className="flex items-center gap-1.5 text-[13px] text-white/25 hover:text-white/50 transition-colors duration-150"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to sign up
          </Link>
        </div>

      </div>
    </div>
  );
}