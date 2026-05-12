// app/components/navbar/NavbarAuthButtons.tsx
// SERVER COMPONENT — pure static HTML links, zero JS bundle impact

import Link from "next/link";

export default function NavbarAuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/sign-in"
        className="h-8 px-4 flex items-center text-[13px] font-medium text-white/55 hover:text-white/90 transition-colors duration-150 rounded-lg hover:bg-white/[0.05]"
      >
        Sign in
      </Link>
      <Link
        href="/sign-up"
        className="h-7 px-4 flex items-center text-[13px] font-semibold text-black bg-i-white rounded-lg hover:bg-white active:scale-[0.97] transition-all duration-150"
      >
        Sign up
      </Link>
    </div>
  );
}