import { NextRequest, NextResponse } from "next/server"
import otpGenerator from "otp-generator"

import User from "@/src/app/models/User"
import OTP from "@/src/app/models/OTP"
import dbConnect from "@/src/app/lib/dbConnect"

export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    const { email }: { email: string } = await req.json()

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already registered",
        },
        { status: 409 }
      )
    }

    let otpDoc

    while (true) {
      try {
        const otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        })

        otpDoc = await OTP.create({
          email,
          otp,
        })

        break
      } catch (error: any) {
        if (error.code === 11000) continue
        throw error
      }
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to send OTP",
      },
      { status: 500 }
    )
  }
}