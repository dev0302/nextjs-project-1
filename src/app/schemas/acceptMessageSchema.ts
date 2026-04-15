// 1. now coming to the acceptMessageSchema schema which is basically just boolean

// 2. import
import z from "zod"
 
// 3. create schema
export const acceptMessageSchema = z.object({
    acceptMessage: z.boolean()
})