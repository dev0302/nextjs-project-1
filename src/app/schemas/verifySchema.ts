// 1. now coming to the verify schema, which is basically for the otp verification

// 2. import
import z from "zod"
 
// 3. create schema (but why object here? event its for one thing.)
export const verifySchema = z.object({
    code: z.string().length(6, "Verification code must be 6 digits" )
})

// why object????
// Even though you only have one field (code), z.object() is still used because:
// In most real-world cases (forms, APIs), data comes as an object, not a single raw value.

// Example input:

// {
//   code: "123456"
// }

// So your schema needs to match that structure:

// Real Flow
// User enters form data
//       ↓
// Zod validates
//       ↓
// Validation fails
//       ↓
// Zod returns error object with your message
//       ↓
// Your code chooses to:
//    → show in UI
//    → send in API response
//    → log it
//    → ignore it