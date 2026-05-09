"use client";

import "../sign-up/sign-up.css" // adjust path if needed
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    setIsSubmitting(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsSubmitting(false);

    console.log(result);
    

    if (result?.error) {
      // result.error is the message from throw new Error() inside authorize()
      setError(result.error);
    } else {
        toast.success("Sign in successfull", {position: "top-right"});
        router.push("/dashboard");
        router.refresh(); // refresh server components/session
        // this is because after login, navbar dubara update hopaye

    }
  };

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
      <div className="signup-card relative z-10 w-full max-w-[388px] bg-white/[0.04] border border-white/[0.08] rounded-[22px] px-10 py-11 backdrop-blur-[48px] shadow-[0_40px_80px_rgba(0,0,0,0.7),0_12px_32px_rgba(0,0,0,0.5),inset_0_0_0_0.5px_rgba(255,255,255,0.04)] mt-10">

        {/* Apple logo */}
        <div className="signup-logo flex justify-center mb-7 opacity-0">
          <svg viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 fill-white/90">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.8 0 663.5 0 541.6c0-194.3 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
          </svg>
        </div>

        <h1 className="signup-title opacity-0 text-[23px] font-bold tracking-[-0.5px] text-[#f5f5f7] text-center mb-1.5">
          Sign in
        </h1>
        <p className="signup-sub opacity-0 text-[14px] text-white/40 text-center mb-9 tracking-[0.05px]">
          Welcome back
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">

          {/* Email */}
          <div className="signup-field-1 opacity-0 flex flex-col gap-[7px]">
            <Label htmlFor="email" className="text-[12px] font-semibold uppercase tracking-[0.6px] text-white/50">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className={inputClass(!!error && !password)}
            />
          </div>

          {/* Password */}
          <div className="signup-field-2 opacity-0 flex flex-col gap-[7px]">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-[12px] font-semibold uppercase tracking-[0.6px] text-white/50">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-[12px] text-white/35 hover:text-white/60 transition-colors duration-150"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className={inputClass(!!error && !email)}
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-[12.5px] text-[#ff453a] bg-[#ff453a]/10 border border-[#ff453a]/20 rounded-lg px-3.5 py-2.5 leading-relaxed">
              {error}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="signup-btn opacity-0 mt-2 h-11 w-full bg-white text-black text-[15px] font-bold rounded-xl hover:bg-white/88 active:scale-[0.985] transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {isSubmitting ? "Signing in…" : "Sign In"}
          </Button>

        </form>

        <div className="signup-divider opacity-0 h-px bg-white/[0.07] my-7" />

        <p className="signup-footer opacity-0 text-[13.5px] text-white/35 text-center">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-white/70 font-medium hover:text-white transition-colors duration-150">
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
}