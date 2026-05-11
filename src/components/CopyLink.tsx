"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Check, Copy } from "lucide-react";
import { useRouter } from "next/navigation"; //must be of from /navigation

export default function CopyLink() {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);

  const username = session?.user?.username;

  const router = useRouter();

//   Important Rule :-
//     Location	Can Access
//     route.ts	all env vars
//     server component	all env vars
//     client component	only NEXT_PUBLIC_*

  const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${username}`;

  const handleCopy = async () => {
    if (!username || copied) return;
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="
        flex flex-col gap-3 w-full
        bg-white/[0.04] border border-white/[0.08]
        rounded-2xl px-5 py-4
        backdrop-blur-xl
        shadow-[0_2px_16px_rgba(0,0,0,0.3),inset_0_0_0_0.5px_rgba(255,255,255,0.04)]
      "
    >
      {/* Label */}
      <div className="flex flex gap-4 items-center justify-between">
        <span className="text-[14px] font-semibold text-white/85 tracking-[-0.2px]">
          Your unique link
        </span>
        <span className="text-[12px] text-white/35">
          Share this link to receive anonymous messages
        </span>
      </div>

      {/* Link field + copy button */}
      <div className="flex items-center gap-2">

        {/* URL field */}
        <div
          className="
            flex-1 h-10 px-3.5 flex items-center
            bg-white/[0.05] border border-white/[0.08]
            rounded-xl overflow-hidden
          "
        >
          <span className="text-[13px] text-white/40 truncate hover:text-blue-300/70 cursor-pointer"
          onClick={()=>{
            router.push(`/u/${username}`);
          }}
          >
            {username ? profileUrl : "Loading…"}
          </span>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          disabled={!username}
          aria-label="Copy link"
          className={`
            shrink-0 h-10 px-4 flex items-center gap-2
            rounded-xl border text-[13px] font-medium
            transition-all duration-200
            disabled:opacity-30 disabled:cursor-not-allowed
            active:scale-[0.96]
            ${copied
              ? "bg-[#32d74b]/15 border-[#32d74b]/30 text-[#32d74b]"
              : "bg-white/[0.07] border-white/[0.1] text-white/70 hover:bg-white/[0.11] hover:text-white/90"
            }
          `}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>

      </div>
    </div>
  );
}