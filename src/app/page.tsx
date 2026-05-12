import dbConnect from "./lib/dbConnect";

export default async function Page() {
  await dbConnect();

  return (
    <main className="i-fonts relative min-h-screen overflow-x-hidden bg-i-black">

      {/* ── Ambient background ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        {/* top-left amber glow */}
        <div className="absolute -top-32 -left-32 w-[420px] h-[520px] rounded-full bg-indigo-300/5 blur-[120px]" />
        {/* bottom-right cool glow */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/[0.05] blur-[100px]" />
        
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-10/12  px-8 mx-auto flex flex-col pb-32">

        {/* ─────────── HERO ─────────── */}
        <section className="mt-28 mb-24 flex flex-col gap-6 max-w-3xl">

          {/* headline */}
          <h1
            className="text-[clamp(2.4rem,4vw,4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-i-white/90"
            style={{ animationDelay: "0.1s" }}
          >
            Scalable{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #4da6ff 0%, #a8d4ff 50%, #6ec6ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Full-Stack
            </span>
            <br />
            Messaging Platform
          </h1>

          {/* sub */}
          <p
            className="text-[16px] leading-[1.7] text-white/55 max-w-xl animate-[fadeSlideDown_0.6s_0.2s_ease_both]"
          >
            A Next.js web application built around one core belief that even a minor project
            should be executed with professional-grade precision, clean architecture, and
            real-world scalability in mind.
          </p>

          {/* CTA row */}
          <div className="flex items-center gap-4 mt-2 animate-[fadeSlideDown_0.6s_0.3s_ease_both]">
            <a
              href="/sign-in"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-i-blue-button hover:bg-i-blue-button2 text-[#0a0a0b] text-[13px] font-semibold tracking-[-0.01em] transition-colors duration-150"
            >
              Get Started
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06] text-white/60 hover:text-white/80 text-[13px] font-medium tracking-[-0.01em] transition-all duration-150"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              View Source
            </a>
          </div>
        </section>

        {/* ─────────── DIVIDER ─────────── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-24" />

        {/* ─────────── WHY I BUILT THIS ─────────── */}
        <section className="mb-24 flex flex-col md:flex-row gap-8 items-start">

          <div className="md:w-1/3 flex-shrink-0">
            <p className="text-[12px] tracking-[0.1em] uppercase text-amber-400/70 mb-3 font-medium">The Motivation</p>
            <h2 className="text-[1.7rem] ml-1 font-bold text-i-white/98 tracking-[-0.025em] leading-[1.2]">
              Why this<br />project exists
            </h2>
          </div>

          <div className="flex flex-col gap-5 md:w-2/3 text-[15px] leading-[1.75] text-white/45">
            <p>
              The goal was never just to ship a working app, it was to understand
              <span className="text-white/70"> what professional development actually looks like</span> at the architecture level.
              Clean folder structure, reusable typed components, and proper separation of concerns from day one.
            </p>
            <p>
              This is my <span className="text-white/70">first major professional-grade Next.js project</span>, and every
              decision, from how data flows between server and client components to how OTP
              verification is handled nd was made intentionally, not just to make it work, but
              to make it <span className="text-white/70">right</span>.
            </p>
            <p>
              Minor scope. Professional execution. Maximum learning.
            </p>
          </div>
        </section>

        {/* ─────────── FEATURE CARDS ─────────── */}
        <section className="mb-24">
          <p className="text-[12px] tracking-[0.1em] uppercase text-amber-400/70 mb-3 font-medium">What's inside</p>
          <h2 className="text-[1.7rem] font-bold text-i-white/98 tracking-[-0.025em] mb-10">
            Features & Architecture
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i} />
            ))}
          </div>
        </section>

        {/* ─────────── TECH STACK ─────────── */}
        <section className="mb-24">
          <p className="text-[12px] tracking-[0.1em] uppercase text-amber-400/70 mb-3 font-medium">Built with</p>
          <h2 className="text-[1.7rem] font-bold text-[#f5f5f7] tracking-[-0.025em] mb-10">
            Tech Stack
          </h2>

          <div className="flex flex-wrap gap-3">
            {stack.map((s) => (
              <span
                key={s}
                className="px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 text-[13px] font-medium hover:border-amber-400/30 hover:text-amber-300/80 hover:bg-amber-400/[0.04] transition-all duration-200 cursor-default"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* ─────────── BOTTOM CTA ─────────── */}
        <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-[1.3rem] font-bold text-[#f5f5f7] tracking-[-0.02em] mb-1">
              Ready to explore?
            </h3>
            <p className="text-[14px] text-white/35">
              Send anonymous messages. Manage your dashboard. See Next.js best practices in action.
            </p>
          </div>
          <a
            href="/sign-up"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-i-blue-button hover:bg-i-blue-button2 text-[#0a0a0b] text-[13.5px] font-semibold tracking-[-0.01em] transition-colors duration-150 whitespace-nowrap"
          >
            Create an account
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </section>

      </div>

      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </main>
  );
}

/* ─────────────────────────────────────────────────
   Data
───────────────────────────────────────────────── */

const features: { icon: any; title: string; desc: string }[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="w-5 h-5 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V7a4.5 4.5 0 10-9 0v3.5M7.5 10.5h9a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 016 18v-6a1.5 1.5 0 011.5-1.5z"
        />
      </svg>
    ),
    title: "Authentication & OTP",
    desc: "Session-based auth with next-auth, email OTP verification, and protected route handling at the server level.",
  },

  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="w-5 h-5 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10h8M8 14h5m-7 6h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Anonymous Messaging",
    desc: "Users receive messages anonymously. Senders stay hidden, the receiver sees only the message, never the source.",
  },

  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="w-5 h-5 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 3v2.25M14.25 3v2.25M4.5 9.75h15M6.75 21h10.5A2.25 2.25 0 0019.5 18.75V8.25A2.25 2.25 0 0017.25 6H6.75A2.25 2.25 0 004.5 8.25v10.5A2.25 2.25 0 006.75 21zm3-7.5h4.5"
        />
      </svg>
    ),
    title: "AI Suggestions via Grok",
    desc: "The send-message route integrates Grok AI to generate smart message suggestions, enhancing the sender experience.",
  },

  {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-5 h-5 text-white"
    >
      <rect
        x="3.75"
        y="4.5"
        width="16.5"
        height="15"
        rx="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 9h7.5M8.25 12h4.5"
      />

      <circle cx="16.5" cy="15.75" r="1.5" fill="currentColor" />
    </svg>
  ),

  title: "Next.js Server Components",
  desc: "Data is fetched at the server layer, zero client-side waterfalls, instant renders, and Suspense-based skeletons.",
},

  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="w-5 h-5 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5v10.5H3.75V6.75zm4.5 4.5h7.5"
        />
      </svg>
    ),
    title: "Clean Architecture",
    desc: "Scalable folder structure, reusable typed components, custom hooks, and strict TypeScript interfaces throughout.",
  },

  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="w-5 h-5 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.5l6.75-6.75 4.5 4.5L21 4.5M21 4.5v6.75M21 4.5h-6.75"
        />
      </svg>
    ),
    title: "Dashboard Management",
    desc: "Manage your inbox, toggle message acceptance, copy your public link, and delete messages with smooth animations.",
  },
];

const stack = [
  "Next.js 14",
  "React 18",
  "TypeScript",
  "MongoDB + Mongoose",
  "next-auth",
  "Tailwind CSS",
  "Grok AI",
  "Lucide Icons",
  "Zod",
  "Resend",
];

/* ─────────────────────────────────────────────────
   FeatureCard — small client-style component inline
───────────────────────────────────────────────── */

function FeatureCard({
  feature,
  index,
}: {
  feature: { icon: any; title: string; desc: string };
  index: number;
}) {
  return (
    <div
      className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 flex flex-col gap-4 hover:border-blue-400/30 hover:bg-i-blue-button2/[0.03] transition-all duration-300"
      style={{
        animation: `fadeSlideUp 0.5s ${0.05 * index + 0.2}s ease both`,
      }}
    >
      {/* subtle corner glow on hover */}
      <div className="pointer-events-none absolute -top-px -left-px w-16 h-16 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
style={{
  background:
    "radial-gradient(circle at 0 0, rgba(59,130,246,0.18), transparent 40%)",
}}
      />

      <span className="text-2xl">{feature.icon}</span>
      <div>
        <h3 className="text-[14px] font-semibold text-i-white tracking-[-0.015em] mb-1.5">
          {feature.title}
        </h3>
        <p className="text-[13px] leading-[1.65] text-white/35">
          {feature.desc}
        </p>
      </div>
    </div>
  );
}