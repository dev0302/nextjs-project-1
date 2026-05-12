// What is next-auth.d.ts?
// It is a TypeScript declaration file.
// .d.ts = Type Definition File
// Used to tell TypeScript:
// “These libraries/types should be considered extended/modified like this.”

import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
    }

    interface Session {
        user:{
            _id?: string;
            isVerified?: boolean;
            isAcceptingMessages?: boolean;
            username?: string;
        } & DefaultSession['user']
    }  
}

declare module "next-auth/jwt" {
    interface JWT {
        _id?: string;
            isVerified?: boolean;
            isAcceptingMessages?: boolean;
            username?: string;
        }
}

// What Module Augmentation Does
// TypeScript has a feature called declaration merging — if you declare the same interface twice, TypeScript merges them:
// NextAuth's built-in definition
// interface User {
//   name?: string;
//   email?: string;
// }

// // your next-auth.d.ts adds to it
// interface User {
//   _id?: string;
//   isVerified?: boolean;
//   username?: string;
// }

// // TypeScript merges both → final type becomes:
// interface User {
//   name?: string;
//   email?: string;
//   _id?: string;        // ← your additions
//   isVerified?: boolean;
//   username?: string;
// }
// The declare module "next-auth" syntax tells TypeScript:
// tsdeclare module "next-auth" {
//   // "I'm adding to the existing next-auth module's types"
//   // "don't replace them, MERGE with them"
//   interface User {
//     _id?: string;
//   }
// }

// Why .d.ts File Specifically
// .d.ts = declaration file — contains only type information, zero runtime code. It's purely for TypeScript's type checker.
// next-auth.d.ts
//   → TypeScript reads this at compile time
//   → merges your additions into NextAuth's types
//   → zero impact on actual JavaScript output
//   → zero runtime cost



// Why & DefaultSession['user']
// tsinterface Session {
//   user: {
//     _id?: string;
//     username?: string;
//   } & DefaultSession['user']  // ← this part
// }
// DefaultSession['user'] = { name?, email?, image? } — NextAuth's original fields.
// The & means intersection — combine both types:
// result is:
// user: {
//   _id?: string;
//   username?: string;
//   name?: string;    // from DefaultSession
//   email?: string;   // from DefaultSession
//   image?: string;   // from DefaultSession
// }
// Without & DefaultSession['user'] — you'd replace the default session user type instead of extending it, losing name, email, image.