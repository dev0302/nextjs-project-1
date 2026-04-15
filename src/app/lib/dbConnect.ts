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

    // 5. if not connected then, connect:

    try {
        const db = mongoose.connect(process.env.DATABASE_URL || '', {})
        connection.isConnected = (await db).connections[0].readyState
        console.log("Database Connected Successfully.");

    } catch (error) {

        console.log("Error while connecting database.");
        process.exit(1);
    }
    
}

export default dbConnect;