// this is to verify the otp

import { NextRequest } from "next/server";
import User from "../../models/User";

export async function POST(req: NextRequest) {

    try {

        // 1. fetch username and otp
        const {username, otp} = await req.json();

        // 2. check user exists with that username or not.
        const user = await User.findOne({username});

        // 3. if user not found, return
        if (!user) {
            return Response.json({
                success: false,
                message: "User not found",
            }, { status: 500 });
        }

        // 4. if user found, check otp with that corresponsing username/ email and otp
        
    } catch (error) {
        
    }
} 