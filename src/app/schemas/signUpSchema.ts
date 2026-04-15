// 1. these are for those validating the input we are taking

// 2. import it
import z from "zod";

// 4. username validation schema
export const usernameSchema = z
    .string()
    .min(2, "Username must be atleast 2 characters")
    .max(20, "username must not be more than 20")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")


// 3. this is our main target, but to more refine it, lets create the username validation seprately.
export const signUpSchema = z.object({
    username: usernameSchema,
    email: z.email({error: "Invalid email address"}),
    password: z.string().min(3, {error: "password must be min 3 chars"})
})

// 5. why in 3rd one object is used and why not in 4th?
// since username schema validation is just for one single thing i.e. username hence no need of object there but in case of singup schema since validation are for more terms ie for an whole object.

// 6. naming of exporting the schema
// schema variable → verifySchema
// TypeScript type → VerifySchema

// This keeps runtime and type names distinct.