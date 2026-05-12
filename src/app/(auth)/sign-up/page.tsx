// https://ui.shadcn.com/docs/installation/next#scaffold-with-create
// npx shadcn@latest init --preset [CODE] --template next
// [CODE] -> any one from them : [CODE]. Available presets: nova, vega, maia, lyra, mira, luma, sera

// npx shadcn@latest add form input label button
// npm install react-hook-form
// npm install zod @hookform/resolvers
// npx shadcn@latest add form

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

"use client";

import "./sign-up.css";

import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/app/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/app/types/ApiResponse";
import z from "zod";
import Link from "next/link";
import { Loader2 } from "lucide-react";

// We omit otp from the schema here since otp is collected on next page
type SignUpFormData = Omit<z.infer<typeof signUpSchema>, "otp">;

export default function Page() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const [debouncedUsername] = useDebounceValue(username, 300);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<SignUpFormData>({
   
    defaultValues: { username: "", email: "", password: "" },
  });

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setValue("username", e.target.value);
  };

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${debouncedUsername}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  // On "Send OTP" — store form data in sessionStorage, send OTP, go to verify page
  const onSendOtp = async (data: SignUpFormData) => {
    setIsSendingOtp(true);
    try {
      await axios.post("/api/send-otp", { email: data.email });

      // Store all 3 fields securely in sessionStorage for use on verify page
      // It Only stores strings — that's why you use JSON.stringify/parse for objects.
      sessionStorage.setItem(
        "signup_pending",
        JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        })
      );

      toast.success("OTP sent to your email!");
      router.push("/verify-otp");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError?.response?.data.message ?? "Failed to send OTP");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const isAvailable =
    !isCheckingUsername &&
    username.length > 0 &&
    usernameMessage.toLowerCase().includes("available");

  const inputClass = (hasError: boolean) =>
    [
      "h-11 text-[15px] rounded-xl px-3.5",
      "bg-white/[0.06] text-[#f5f5f7]",
      "placeholder:text-white/20",
      "focus-visible:ring-0 focus-visible:ring-offset-0",
      "transition-colors duration-200",
      hasError
        ? "border border-red-500/50 focus-visible:border-red-500/60"
        : "border border-white/10 hover:border-white/15 focus-visible:border-white/25",
    ].join(" ");

    

  return (
    <div className="signup-page relative min-h-screen bg-black flex items-center justify-center px-4 py-10 overflow-hidden">
      <div className="signup-card relative z-10 w-11/12 sm:w-full max-w-[388px] bg-white/[0.04] border border-white/[0.08] rounded-[22px] px-10 py-11 backdrop-blur-[48px] shadow-[0_40px_80px_rgba(0,0,0,0.7),0_12px_32px_rgba(0,0,0,0.5),inset_0_0_0_0.5px_rgba(255,255,255,0.04)] mt-10">

        {/* Apple logo */}
        <div className="signup-logo flex justify-center mb-7 opacity-0">
          <svg viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 fill-white/90">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.8 0 663.5 0 541.6c0-194.3 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
          </svg>
        </div>

        <h1 className="signup-title opacity-0 text-[23px] font-bold tracking-[-0.5px] text-[#f5f5f7] text-center mb-1.5">
          Create your account
        </h1>
        <p className="signup-sub opacity-0 text-[14px] text-white/40 text-center mb-9 tracking-[0.05px]">
          Sign up to get started today
        </p>

        <form onSubmit={handleSubmit(onSendOtp)} className="flex flex-col gap-[14px]">

          {/* Username */}
          <div className="signup-field-1 opacity-0 flex flex-col gap-[7px]">
            <Label htmlFor="username" className="text-[12px] font-semibold uppercase tracking-[0.6px] text-white/50">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="john_doe"
              autoComplete="username"
              value={username}
              onChange={handleUsernameChange}
              className={inputClass(!!errors.username)}
            />
            {username.length > 0 && (
              <p className={`text-[12px] flex items-center gap-1.5 ${
                isCheckingUsername ? "text-white/30" : isAvailable ? "text-[#32d74b]" : "text-[#ff453a]"
              }`}>
                {isCheckingUsername ? (
                  <><Loader2 className="w-3 h-3 animate-spin" /> Checking…</>
                ) : (
                  <><span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isAvailable ? "bg-[#32d74b]" : "bg-[#ff453a]"}`} />{usernameMessage}</>
                )}
              </p>
            )}
            {errors.username && <p className="text-[12px] text-[#ff453a]">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div className="signup-field-2 opacity-0 flex flex-col gap-[7px]">
            <Label htmlFor="email" className="text-[12px] font-semibold uppercase tracking-[0.6px] text-white/50">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
              className={inputClass(!!errors.email)}
            />
            {errors.email && <p className="text-[12px] text-[#ff453a]">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="signup-field-3 opacity-0 flex flex-col gap-[7px]">
            <Label htmlFor="password" className="text-[12px] font-semibold uppercase tracking-[0.6px] text-white/50">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              {...register("password")}
              className={inputClass(!!errors.password)}
            />
            {errors.password && <p className="text-[12px] text-[#ff453a]">{errors.password.message}</p>}
          </div>

          {/* Send OTP button */}
          <Button
            type="submit"
            disabled={isSendingOtp}
            className="signup-btn opacity-0 mt-2 h-11 w-full bg-white text-black text-[15px] font-bold rounded-xl hover:bg-white/88 active:scale-[0.985] transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isSendingOtp && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {isSendingOtp ? "Sending OTP…" : "Send OTP"}
          </Button>

        </form>

        <div className="signup-divider opacity-0 h-px bg-white/[0.07] my-7" />

        <p className="signup-footer opacity-0 text-[13.5px] text-white/35 text-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-white/70 font-medium hover:text-white transition-colors duration-150">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}