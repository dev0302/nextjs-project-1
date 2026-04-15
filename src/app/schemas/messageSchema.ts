// 1. now coming to the message schema

// 2. import
import z, { string } from "zod"
 
// 3. create schema
export const messageSchema = z.object({
    content : z.
        string()
        .min(10, {message: "content must be of min length 10 chars"})
        .max(300, {message: "content must not be longer than 300 chars"})
})
