"use client";

import { useState, useCallback } from "react";
import { EmailClientCard } from "@/components/email-client-card";
// import { RefreshCw } from "lucide-react";
import { RefreshCcw, Loader2 } from 'lucide-react';


interface Message {
  _id: string;
  content: string;
  createdAt: string;
}

interface Props {
  initialMessages: Message[];
}

export default function MessageGrid({ initialMessages }: Props) {
  const [messages, setMessages] = useState(initialMessages);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  // const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRefresh = useCallback(async () => {

    setLoading(true);

    try {
      const res = await fetch("/api/get-messages", { cache: "no-store" });
      const data = await res.json();
      setMessages(data.messages ?? []);
    } catch {
      // silently fail
    } finally {

      // small delay so spinner is visible
      setTimeout(() => {
        setLoading(false);
      }, 800);

    }
  }, []);

  const handleDelete = (messageId: string) => {
    setDeletingIds((prev) => new Set(prev).add(messageId));
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m._id !== messageId));
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(messageId);
        return next;
      });
    }, 400);
  };

  return (
    
    <div className="flex flex-col gap-6">

      <button
            onClick={handleRefresh}
            disabled={loading}
            className="border px-6 py-2 rounded-md cursor-pointermy-2 bg-amber-50/5 flex items-center justify-center w-fit"
          >
            {
              loading
                ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )
                : (
                    <RefreshCcw className="w-4 h-4" />
                  )
            }
      
          </button>

      {/* Header with refresh */}
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-white/70 tracking-[-0.2px]">
          Messages
          {messages.length > 0 && (
            <span className="ml-2 text-[12px] font-normal text-white/30">
              {messages.length}
            </span>
          )}
        </h2>
        {/* <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12.5px] font-medium text-white/40 hover:text-white/70 hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08] transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing…" : "Refresh"}
        </button> */}
      </div>

      {/* Empty state */}
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-[40vh]">
          <p className="text-sm text-white/30">No messages yet</p>
        </div>
      )}

      {/* Grid */}
      {messages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {messages.map((message) => {
            const isDeleting = deletingIds.has(message._id);
            return (
              <div
                key={message._id}
                style={{
                  transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                  opacity: isDeleting ? 0 : 1,
                  transform: isDeleting ? "scale(0.92) translateY(-8px)" : "scale(1) translateY(0px)",
                  pointerEvents: isDeleting ? "none" : "auto",
                }}
              >
                <EmailClientCard
                  messageId={message._id}
                  avatarFallback="AN"
                  senderName="Anonymous"
                  senderEmail="anonymous@message.com"
                  timestamp={new Date(message.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                  message={message.content}
                  onDelete={handleDelete}
                />
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}