"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/app/types/ApiResponse";
import { Loader2 } from "lucide-react";

export default function MessageToggle({initialIsAccepting}: {initialIsAccepting: boolean}) {
  const [isAccepting, setIsAccepting] = useState(initialIsAccepting);
  // const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // useEffect(() => {
  //   const fetchStatus = async () => {
  //     try {
  //       const res = await axios.get("/api/accept-messages");
  //       setIsAccepting(res.data.isAcceptingMessages);
  //     } catch (error) {
  //       const axiosError = error as AxiosError<ApiResponse>;
  //       toast.error(axiosError.response?.data.message ?? "Failed to fetch status");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchStatus();
  // }, []);

  const toggle = async () => {
    if (isUpdating) return;
    const newValue = !isAccepting;
    setIsAccepting(newValue);
    setIsUpdating(true);
    try {
      const res = await axios.post("/api/accept-messages", {
        acceptMessage: newValue,
      });
      toast.success(res.data.message);
    } catch (error) {
      setIsAccepting(!newValue);
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? "Failed to update");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className="
        inline-flex items-center gap-4 w-[30%] h-full
        bg-white/[0.04] border border-white/[0.08]
        rounded-2xl px-5 py-4
        backdrop-blur-xl
        shadow-[0_2px_16px_rgba(0,0,0,0.3),inset_0_0_0_0.5px_rgba(255,255,255,0.04)]
      "
    >
      {/* Label section */}
      <div className="flex flex-col gap-0.5 select-none">
        <span className="text-[14px] font-semibold text-white/85 tracking-[-0.2px]">
          Incoming Messages
        </span>
        {/* {isLoading ? (
          <span className="text-[12px] text-white/30">Loading…</span>
        ) : (
          <span
            className={`text-[12px] font-medium transition-colors duration-300 ${
              isAccepting ? "text-[#32d74b]" : "text-white/30"
            }`}
          >
            {isAccepting ? "Accepting messages" : "Paused"}
          </span>
        )} */}
        <span
          className={`text-[12px] font-medium transition-colors duration-300 ${
            isAccepting
              ? "text-[#32d74b]"
              : "text-white/30"
          }`}
        >
          {isAccepting
            ? "Accepting messages"
            : "Paused"}
        </span>
      </div>

      {/* Toggle switch */}
      <button
        onClick={toggle}
        // disabled={isLoading || isUpdating}
        disabled={isUpdating}
        aria-checked={isAccepting}
        role="switch"
        aria-label="Toggle message acceptance"
        className={`
          relative shrink-0 w-[45px] h-[25px] rounded-full
          transition-all duration-300 ease-in-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30
          disabled:opacity-40 disabled:cursor-not-allowed
          ${isAccepting
            ? "bg-[#32d74b] shadow-[0_0_12px_rgba(50,215,75,0.4)]"
            : "bg-white/[0.12] border border-white/[0.1]"
          }
        `}
      >
        {/* Thumb */}
        <span
          className={`
            absolute top-[2px]
            w-[21px] h-[21px] rounded-full
            flex items-center justify-center
            shadow-[0_2px_6px_rgba(0,0,0,0.4),0_1px_2px_rgba(0,0,0,0.3)]
            transition-all duration-300 ease-in-out
            ${isAccepting
              ? "left-[22px] bg-white"
              : "left-[2px] bg-white/90"
            }
          `}
        >
          {/* Spinner inside thumb while updating */}
          {isUpdating && (
            <Loader2 className="w-3 h-3 text-black/40 animate-spin" />
          )}
        </span>
      </button>
    </div>
  );
}