// this is a singup route, ie from here singup will be done.

import dbConnect from "@/app/lib/dbConnect";
import OTP from "@/app/models/OTP";
import User from "@/app/models/User";
import { ApiResponse } from "@/app/types/ApiResponse";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SafeUser } from "@/app/types/user";

// 3. initially writing how the singupbody, ie data which will come from frontend should be
interface SignupBody {
    username: string;
    email: string;
    password: string;
    otp: string;
};

// 1. write the main function as per the route req ie POST here.
export async function POST(req: NextRequest) {

    // 2. write logic for performing singup
    try {
        
        // first make a connection with database (since nextjs things)
        await dbConnect();

        // now fetch the data from request body
        const body: SignupBody = await req.json();
        const { username, email, password, otp } = body;

        // now validate it
        if (!username || !email || !password || !otp) {
            return NextResponse.json(
                { success: false, message: "All fields required" },
                { status: 400 }
            );
        }

        // now, if validated, check whether user exists before or not
        const existingUser = await User.findOne({email});

        // if already exists, return
        if(existingUser) {

            // using typescript check also via ApiResponse interface
            const response: ApiResponse = {
                success: false,
                message: "User Already Exists"
            }

            return NextResponse.json (
               response, {status: 409}
            );
        }

        // else if not exists, create it

        // first verify the otp
        // first fetch otp from db
        const recentOTP = await OTP.find({email}).sort({ createdAt: -1 }).limit(1);

        // then match with the user's entered otp

        // if not matched
        if(!recentOTP.length || recentOTP[0].otp !== otp){
            // using typescript check also via ApiResponse interface
            const response: ApiResponse = {
                success: false,
                message: "Invalid OTP"
            }

            return NextResponse.json (
               response, {status: 401}
            );
        }

        // now if otp verified, hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        // all done, now save the whole user data in database
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            isVerified: true,
            isAcceptingMessages: true,
            messages: []
        })

        

        // now returning response but with generic interface
        const response: ApiResponse<SafeUser> = {
            success: true,
            message: "User Registered Successfully",
            data: {
                id: user._id.toString(),
                username: user.username,
                email: user.email,
                isVerified: user.isVerified,
                isAcceptingMessages: user.isAcceptingMessages,
                messages: user.messages
            }
        }

        return NextResponse.json (
            response, {status:201}
        )



    } catch (error:any) {
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Signup failed",
            },
            { status: 500 }
        )
    }
}