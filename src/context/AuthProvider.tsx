// Context hooks like SessionProvider only work on the client side

// 1. make is client page first
"use client";

// 2. import SessionProvider
import { SessionProvider } from "next-auth/react";

// 3. for childern define interface
interface Props {
  children: React.ReactNode;
}

// This component wraps your entire application (in layout.tsx).
// It acts as a "Broadcaster" that tells all Client Components 
// whether a user is logged in or not.

// 4. now write actual function
export default function AuthProvider ({children}: Props) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

// 5. now go to layout.tsx to wrap code inside <AuthProvider>

