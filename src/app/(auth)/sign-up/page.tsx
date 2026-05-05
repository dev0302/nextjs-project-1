// https://ui.shadcn.com/docs/installation/next#scaffold-with-create
// npx shadcn@latest init --preset [CODE] --template next
// [CODE] -> any one from them : [CODE]. Available presets: nova, vega, maia, lyra, mira, luma, sera

// npx shadcn@latest add form input label button
// npm install react-hook-form
// npm install zod @hookform/resolvers
// npx shadcn@latest add form

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
    console.log("inside frontend singup route");
    
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  // Send OTP to email
  const handleSendOtp = async () => {
    if (!form.email) {
      setError("Please enter your email first.");
      return;
    }

    setLoadingOtp(true);
    setError("");

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to send OTP.");
      } else {
        setOtpSent(true);
        setSuccess("OTP sent to your email!");
        setTimeout(() => setSuccess(""), 4000);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoadingOtp(false);
    }
  };

  // Submit signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { username, email, password, otp } = form;

    if (!username || !email || !password || !otp) {
      setError("All fields are required.");
      return;
    }

    setLoadingSignup(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed.");
      } else {
        setSuccess("Account created! Redirecting...");
        setTimeout(() => router.push("/sign-in"), 1500);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoadingSignup(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div className="space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="john_doe"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>

          {/* Email + Send OTP */}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleSendOtp}
                disabled={loadingOtp || !form.email}
                className="shrink-0"
              >
                {loadingOtp ? "Sending..." : otpSent ? "Resend" : "Send OTP"}
              </Button>
            </div>
          </div>

          {/* OTP — shown after send */}
          {otpSent && (
            <div className="space-y-1.5">
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                name="otp"
                type="text"
                placeholder="Enter OTP sent to your email"
                value={form.otp}
                onChange={handleChange}
                maxLength={6}
                autoComplete="one-time-code"
              />
            </div>
          )}

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          {/* Error / Success messages */}
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-600">{success}</p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={loadingSignup || !otpSent}
          >
            {loadingSignup ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-foreground underline underline-offset-4 hover:opacity-80">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}



