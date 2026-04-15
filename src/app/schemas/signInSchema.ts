// 1. now coming to the signin schema

// 2. import
import z from "zod"
 
// 3. create schema
export const signInSchema = z.object({
    username: z.string(),
    password: z.string()
})
