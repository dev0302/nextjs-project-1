// lib/auth.ts
//  npm install next-auth
import NextAuth, { AuthOptions } from "next-auth"; // Use AuthOptions here
// 1. imports
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
import dbConnect from "./dbConnect";
import User from "../models/User";
import bcrypt from "bcrypt";

// 2. export this function
// AuthOptions v imp nhi to many errors
export const NEXT_AUTH_CONFIG: AuthOptions = {

    // 2. writing the providers
    providers: [

        // 3. our main custom provider -> CredentialsProvider
        CredentialsProvider({
            name: 'Credentials', // 4. always this
            credentials: {

                // 5. the actual input feilds
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },

            },

            // 6. the function to perfrom authorization, db connect etc
            async authorize(credentials: any): Promise<any> {
                // Here is where you'd call your database (MongoDB/Postgres)
                // const user = await prisma.user.findFirst(...)

                // 7. connect with database
                await dbConnect();

                // 8. main logic for auth
                try {

                    // fetch both email and password from credentials parameter
                    const {email, password} = credentials || {};

                    // validate
                    if (!email || !password) {
                        throw new Error("Email and Password required");
                    }

                    // now check whether user exits
                    const user = await User.findOne({email});

                    // if not
                    if (!user) {
                        throw new Error("User not found");
                    }

                    // now check for password using bcrypt
                    if(await bcrypt.compare(password, user.password)){
                        return user;

                    } else {
                        throw new Error("Invalid password");
                    }

                    
                } catch (error) {
                    throw new Error("Authentication Failed");
                }

            },
        }),

        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID!,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        // })
        
    ],

    callbacks: {
        // This is CRITICAL. By default, NextAuth only returns name, email, and image.
        // Use these callbacks to pass the User ID or Role to the frontend.

        // important info, if done like this:
        // jwt: async ({ user, token }: any)  -> since any -> no error in ts but also, 
        // Your code works, but you lose:
        // Type Safety
        // No autocomplete
        // No error detection
        // Can make silent bugs

        // what is preferred ?
        // Create types/next-auth.d.ts <----------
        // Extend Session/JWT/User
        // Remove any
        // Use inferred callback types


        jwt: async ({ user, token }) => {
            if (user) {
                token._id = user.id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username
            }

            return token;
        },
        
        session: ({ session, token }) => {
            if (session.user) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username
            }
            
            return session;
        }
    },

    // now session, ie. How NextAuth stores and manages logged-in user session (by default if no database adabter connected -> jwt)
    session : {
        strategy: "jwt"
    },

    // important to make it run
    secret: process.env.NEXTAUTH_SECRET,


    // pages: {
    //     signIn: '/signin', // If you want a custom login page instead of the default one
    // }
}