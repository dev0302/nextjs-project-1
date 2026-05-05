// this is a get-message route, here new concept ie Aggregation Pipeline will be used.
// Main questions : 
// 1. first is why aggregation pipeline?
// 2. why is it needed.
// 3. step to take care while creating it.
// 4. how to step by step create it.

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { NEXT_AUTH_CONFIG } from "../../lib/auth";
import mongoose from "mongoose";
import UserModel from "../../models/User"; //ye actually mei real name of model is User but here i m making it UserModel because its name colliding with the one used in User imported from next-ath.

// 1. firstly why??
// Since we are using Embedded Documents (messages are an array inside the User document), a simple User.findById might work for a small app, but for a real-world application, we need an Aggregation Pipeline.


// 1. Why use Aggregation for get-messages?
// If you just do User.findById(id), MongoDB returns the entire user object, including the hashed password and all metadata. More importantly:

// Sorting: You can't easily sort the internal messages array by date using a simple find.

// Performance: If a user has 1,000 messages, fetching the whole user object just to read messages is heavy on memory.

// Reshaping: Aggregation allows you to return an object that contains only the messages, formatted exactly how the frontend needs them.

// 2. The Logic (The Algorithm)
// When you write your GET route, your pipeline will follow these steps:

// Match: Find the specific user by their ID.

// Unwind: Take the messages array and "flatten" it so each message becomes its own document temporarily.

// Sort: Sort these individual message documents by createdAt (descending).

// Group: Put the sorted messages back into an array for that specific user.

// 3. Critical "Gotchas" for your route.ts
// A. Converting String ID to ObjectId
// In NextAuth and standard API routes, the userId is often a String. However, inside an Aggregation Pipeline, Mongoose does not automatically convert strings to ObjectIds like it does in findById.
// You must manually wrap the ID in new mongoose.Types.ObjectId(userId).

// B. The Result is an Array
// .aggregate() always returns an array of results, even if you are looking for one user. You will need to access the first element: result[0].

// C. Handle "No Messages"
// If a user has 0 messages, $unwind might make the user disappear from the result. You can use the preserveNullAndEmptyArrays option if needed, but usually, for a "Get Messages" route, returning an empty array is fine.

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    // 1. Authenticate the session
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const user: User = session?.user as User; //assetion.

    if (!session || !user) {
      return NextResponse.json(
        { success: false, message: "Not Authenticated" },
        { status: 401 }
      );
    }

    // 2. Convert string ID to MongoDB ObjectId
    // This is vital because aggregate does not auto-convert strings
    const userId = new mongoose.Types.ObjectId(user._id);

    // 3. The Aggregation Pipeline
    const userMessages = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]).exec();

    // 4. Handle results
    // If the pipeline returns nothing, it might mean the user has no messages
    if (!userMessages || userMessages.length === 0) {
      return NextResponse.json(
        {
          success: true,
          messages: [], // Return empty array instead of 404
        },
        { status: 200 }
      );
    }

    // 5. Success response
    return NextResponse.json(
      {
        success: true,
        messages: userMessages[0].messages,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Error in GET /api/get-messages:", error);
    
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while fetching messages",
      },
      { status: 500 }
    );
  }
}