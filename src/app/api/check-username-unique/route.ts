// 1. username will be coming from url
// 2. need to fetch username from url params
// 3. checking from db whether username unique or not
// 4. if not, returing
// 5. if yes, return unique
// 6. zod validation

import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../types/ApiResponse";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import z from "zod";
import { usernameSchema } from "../../schemas/signUpSchema";

// create zod validation from username
const UsernameQuerySchema = z.object({
    username: usernameSchema
})

export async function GET(req: NextRequest) {

    try {
        
        // 1. get the full url from the request
        const {searchParams} = new URL(req.url);

        // 2. extract the specific parameter by name
        const username = searchParams.get("username");
        console.log(username);

        // validate username using zod
        const result = UsernameQuerySchema.safeParse({username});

        // if not following zod validation
        if (!result.success) {
            return Response.json({
                success: false,
                message: result.error.issues[0].message,
            }, { status: 400 });
        }
        

        // 3. check in the db whether username is unique or not
        
        // first connect to db
        await dbConnect();

        // search in db
        const usernameExists = await User.findOne({username: username});
        
        // if already exists return
        if(usernameExists) {
            const response:ApiResponse = {
                success: false,
                message: "Username already exists"
            }

            return NextResponse.json(response, {status:200})
        }

        // else if not already exists
        const response:ApiResponse = {
            success: true,
            message: "Username is unique"
        }

        return NextResponse.json(response, {status:200})
        

    } catch (error) {

        const response:ApiResponse = {
            success: false,
            message: "Error while validating username uniqueness"
        }

        return NextResponse.json(response, {status:401})
    }
}