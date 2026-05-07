import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/models/User";
import { ApiResponse } from "@/app/types/ApiResponse";
import { SafeUser } from "@/app/types/user";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest) {
    console.log("heyyyyyyy");
    
    // 1. connect db
    await dbConnect();

    try {
        console.log("deting");
        
        // 2. get server session(authenticating)
        const session = await getServerSession(NEXT_AUTH_CONFIG);

        // 3. fethc user data from that session
        const user: User = session?.user as User;

        // 4. validation
        if (!session || !user) {
            return NextResponse.json(
                { success: false, message: "Not Authenticated" },
                { status: 401 }
            );
        }

        // 5. now userid, generally its in the string form when obtianed from serverSession but still we can directly use it, as Mongoose usually auto-converts it to ObjectId.
        const userId = user._id;

        // 6. now fetch messageId from url
        const messageId = req.nextUrl.searchParams.get("messageId");

        if (!messageId) {
            return NextResponse.json(
                { success: false, message: "messageId not found" },
                { status: 404 }
            );
        }

        // go for db call
        // updateOne() never returns updated document.
        const result = await UserModel.findByIdAndUpdate(userId, {
            $pull: {
                messages : {_id: messageId}
            },
        }, {new: true});

        if (!result) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found"
                },
                { status: 404 }
            );
        }

        console.log("updated user array : ", result);

        // now returning response but with generic interface
        const response: ApiResponse<SafeUser> = {
            success: true,
            message: "Message Deleted Successfully",
            data: result
        }

        return NextResponse.json (
            response, {status:201}
        )
        
    
    } catch (error) {
        console.error("Error in GET /api/delete-message:", error);
            
        return NextResponse.json(
            {
            success: false,
            message: "Error while deleting message",
            },
            { status: 500 }
        );
    }
}




// | Method   | Used For                | Example                        |
// | -------- | ----------------------- | ------------------------------ |
// | `GET`    | Fetch/read data         | Get users, messages            |
// | `POST`   | Create new data         | Add user, send message         |
// | `PUT`    | Replace full resource   | Replace full user object       |
// | `PATCH`  | Update part of resource | Update name, remove array item |
// | `DELETE` | Delete resource         | Delete user/message            |
