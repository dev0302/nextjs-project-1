// 1. import next auth config since needed in getserversession parameter
import { NextRequest, NextResponse } from "next/server";
import { NEXT_AUTH_CONFIG } from "../../lib/auth";
// 2. import getServerSession
import { getServerSession } from "next-auth";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

// also lets fetch the acceptMessage zod validation schema
import { acceptMessageSchema } from "../../schemas/acceptMessageSchema";
import { ApiResponse } from "../../types/ApiResponse";

// 3. create a function (POST)
export async function POST(req: NextRequest) {

    await dbConnect(); // Connect early

    try {

        // fetch user data through getServerSession
        const session = await getServerSession(NEXT_AUTH_CONFIG);
        // This line goes into the request headers, finds the encrypted session cookie, decrypts it using your NEXTAUTH_SECRET, and returns the user object, if not-logined returns null.

        // now also fetch user details from session
        const user = session?.user;

        // if no session, ie user not logged in, therefore return
        if(!session || !session.user) {
            const response = {
                success: false,
                message: "Not Authenticated"
            }
    
            return NextResponse.json(response, {status:401})
        }

        // otherwise if logined,
        // let first fetch user id
        const userId = user?._id;

        // not let frontend will also be sending some flag that is "acceptMessage" either if will be true or false., let's fetch it first.
        const {acceptMessage} = await req.json();

        // validating using its schema
        const result = acceptMessageSchema.safeParse(acceptMessage);

        if (!result.success) {
            return NextResponse.json({
                success: false,
                message: result.error.issues[0].message // This gives the exact reason (e.g., "Expected boolean, received string") 
            }, { status: 400 });
        }

        // now all done, so all work required now is to update changes in the database.
        

        // update the changes
        const updatedUser = await User.findByIdAndUpdate(userId, {isAcceptingMessages: acceptMessage}, {new:true}); // Returns the document AFTER the change

        // if cant be able to do it
        if(!updatedUser) {

            const response = {
                success: false,
                message: "Cant be able to update users accept message status or user not found"
            }
    
            return NextResponse.json(response, {status:404})
        }

        // else, return positive response
        const response = {
            success: true,
            message: "User's isAcceptingMessages status updated successfully."
        }
    
        return NextResponse.json(response, {status:200})


    } catch (error) {
        
        const response = {
            success: false,
            message: "Error while updating users isAcceptingMessages status"
        }

        return NextResponse.json(response, {status:500})
    }
}

// 4. creating a function (GET)
export async function GET(req: NextRequest) {

    // 0. first lets connect to the database
    await dbConnect();
    
    // 1. fetch session
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    // 2. fetch user from session
    const user = session?.user;

    // 3. now validate session is there or is it null
    if(!session) {
        const response:ApiResponse = {
            success: false,
            message: "Not Authenticated"
        }

        return NextResponse.json(response, {status:401});
    }

    // 4. now let's fetch userId from that user
    const userId = user?._id;

    try {
        
        // 5. now lets also check whether user exists or not
        const userExits = await User.findById(userId)

        // 6. if not exists, return
        if(!userExits) {
            const response:ApiResponse = {
                success: false,
                message: "user not found."
            }

            return NextResponse.json(response, {status:404});

        }

        // 7. else if user found, return its isAcceptingMessages status
        const response = {
            success: true,
            isAcceptingMessages: userExits?.isAcceptingMessages
        }

        return NextResponse.json(response, {status:200});
        
    } catch (error) {

        const response: ApiResponse = {
            success: false,
            message: "Error while getting message acceptance status"
        }

        return NextResponse.json(response, {status:500});
    }
    
}
