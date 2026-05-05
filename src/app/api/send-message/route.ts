// to send message or we can say to push message in the messages array[] of user schema.

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import User, { Message } from "../../models/User";

export async function POST(req: NextRequest) {
    // connect db
    dbConnect();

    try {
        
        // fetch data from body
        const {username, content} = await req.json();

        // 2. find user by username
        const user = await User.findOne({username});

        // 3. validate
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // 4. check if user is accepting messsages
        if (!user.isAcceptingMessages) {
            return NextResponse.json(
                { success: false, message: "User is not accepting messages" },
                { status: 403 } // 403 = Forbidden
            );
        }

        // 5. create message object
        const newMessage = {
            content,
            createdAt: new Date()
            // why explicitly this?
            // Human Readable: You can look at your database and immediately see 2024-05-20T...
        }

        // 4. Push to the messages array
        // We push the message casted as our Message interface
        user.messages.push(newMessage as Message);
        await user.save();

        return NextResponse.json(
            { success: true, message: "Message sent successfully" },
            { status: 201 }
        );


    } catch (error) {
        console.error("Error sending message:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}