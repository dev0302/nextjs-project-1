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
