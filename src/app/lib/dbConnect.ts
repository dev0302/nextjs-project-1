// now connecting our database, keeping in mind its nextjs

// 1. import
import mongoose from "mongoose";

// 2. connectionObject
type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {}

// 3. now connecting database
async function dbConnect(): Promise<void> {
    
    //  4. case-1 if already connected, return
    if(connection.isConnected){
        console.log("Already Connected to database");
        return
    }

    // if no db url 
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not defined in environment variables");
    }

    // 5. if not connected then, connect:

    try {
        const db = await mongoose.connect(process.env.DATABASE_URL || '', {})
        connection.isConnected = db.connections[0].readyState;
        console.log("Database Connected Successfully.");

    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
    
}

export default dbConnect;

// prcoess.exit(1)
// What happens if you remove it?
// typescript// Without process.exit(1)
// try {
//     const db = await mongoose.connect(...)
// } catch (error) {
//     console.error("Error connecting to database:", error);
//     // execution continues...
// }
// Your app keeps running despite having no DB connection. Then when any request tries to use the DB:
// // User hits /api/signup
// await User.create(...)  // 💥 crashes here with a confusing error
//                         // instead of failing loudly at startup
// So you get silent failure — the app appears to be running fine but every DB operation blows up individually, giving you confusing errors far away from the actual problem.

// With process.exit(1)
// Server starts →  DB connection fails →  App immediately dies
//                                          ↓
//                               Logs show exactly what went wrong
//                               at the right moment
// Fail loudly and early, rather than silently and later.

// Should you always use it though?
// Not necessarily. There are alternatives:

// process.exit(1) is fine for a startup connection like this since there's no point running the app without a DB. But for things like a momentary disconnect mid-runtime, you'd want retry logic instead of killing the whole process.
