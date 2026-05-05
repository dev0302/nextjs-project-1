import mongoose, { Schema, Document, Model } from "mongoose"
import mailSender from "../lib/mailSender"
import otpTemplate from "@/templates/otpTemplate"

export interface IOTP extends Document {
  email: string
  otp: string
  createdAt: Date
}

const OTPSchema = new Schema<IOTP>({
  email: {
    type: String,
    trim: true,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60,
  },
})

async function sendVerificationEmail(
  email: string,
  otp: string
) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      otpTemplate(otp)
    )

    if (mailResponse) {
      console.log("OTP Email sent.")
    }
  } catch (error) {
    console.error("OTP Model Error:", error)
  }
}

OTPSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp)
  }

})

const OTP: Model<IOTP> =
  mongoose.models.OTP ||
  mongoose.model<IOTP>("OTP", OTPSchema)

export default OTP