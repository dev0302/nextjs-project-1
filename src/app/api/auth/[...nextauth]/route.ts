import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import NextAuth from "next-auth";
console.log("inside send nextauth route");
const handler = NextAuth(NEXT_AUTH_CONFIG);

export {handler as GET, handler as POST};