// app/components/navbar/Navbar.tsx
// SERVER COMPONENT — renders on server, zero client JS for the shell
// Only the interactive dropdown is client-side (NavbarUserMenu.tsx)

import { getServerSession } from "next-auth";
import NavbarUserMenu from "./NavbarUserMenu";
import Link from "next/link";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import NavbarAuthButtons from "./NavbarAuthButtons";
import NavbarMiddleLink from "./NavbarMiddleLink";

export default async function Navbar() {
  // Runs on server — no useSession, no client JS
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Frosted glass bar */}
      <div className="mx-auto max-w-[1100px] px-5 my-3 i-fonts">
        <nav className="flex items-center justify-between h-11 px-5 rounded-2xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-2xl shadow-[0_2px_24px_rgba(0,0,0,0.4),inset_0_0_0_0.5px_rgba(255,255,255,0.05)]">

          {/* Left — Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Home"
          >
            <svg
              viewBox="0 0 814 1000"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px] fill-white/85 group-hover:fill-white transition-colors duration-200"
            >
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.8 0 663.5 0 541.6c0-194.3 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
            </svg>
            <span className="text-[15px] font-semibold text-white/85 group-hover:text-white tracking-[-0.3px] transition-colors duration-200">
              Nextjs Project
            </span>
          </Link>

          <NavbarMiddleLink></NavbarMiddleLink>
          
        
  

          {/* Right — server decides which component to render */}
          {session?.user ? (
            // Signed in → client component for dropdown interactivity
            <NavbarUserMenu username={session?.user.username ?? ""}  />
          ) : (
            // Not signed in → fully static, no JS needed
            <NavbarAuthButtons />
          )}

        </nav>
      </div>
    </header>
  );
}