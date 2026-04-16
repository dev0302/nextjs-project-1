import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"

import User from "@/src/app/models/User"
import OTP from "@/src/app/models/OTP"
import dbConnect from "@/src/app/lib/dbConnect"
// import Profile from "@/src/app/models/Profile"

interface SignupBody {
  username: string
  email: string
  password: string
  verifycode: string
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    const body: SignupBody = await req.json()

    const {
      username,
      email,
      password,
      verifycode,
    } = body

    if (
      !username ||
      !email ||
      !password ||
      !verifycode
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      )
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 }
      )
    }

    const recentOTP = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1)

    if (!recentOTP.length || recentOTP[0].otp !== verifycode) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP",
        },
        { status: 401 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

  
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        // verifycode,
        // verifyCodeExpiry: Date,
        isVerified: true,
        isAcceptingMessages: true,
        messages: []
    })

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data: {
            id: user._id,
            username: user.username,
            email: user.email,
            isVerified: user.isVerified,
            isAcceptingMessages: user.isAcceptingMessages,
            messages: user.messages
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Signup failed",
      },
      { status: 500 }
    )
  }
}