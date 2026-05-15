// 1. install mongoose
import mongoose from "mongoose";

// 2. create interface for message
export interface Message extends Document{
    content: string;
    createdAt: Date;
}

// Why extend Document? ---------------------------------------------

// Because MongoDB documents also have:

// _id
// save()
// etc.

// So: Message document = MongoDB document + your fields
// -------------------------------------------------------------------

// 3. create Message Schema now 
const MessageSchema: mongoose.Schema<Message> = new mongoose.Schema ( {

    content: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// 4. create interface for message
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
//   verifyCode: string;
//   verifyCodeExpiry: Date; 
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

// 5. create Message Schema now 
const UserSchema: mongoose.Schema<IUser> = new mongoose.Schema ( {

    username: {
        type: String,
        required: [true, 'Username is required'],
        // try {
        //     await user.save();
        // } catch (error) {
        //     console.log(error.message);
        // }
        // console.log(error.errors.username.message);

        // dynamically
        // for (let field in error.errors) {
        //   console.log(error.errors[field].message);
        // }
        
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    // verifyCode: {
    //     type: String,
    //     required: [true, 'Verify Code is required'],
    // },
    // verifyCodeExpiry: {
    //     type: Date,
    //     required: [true, 'Verify Code Expiry is required'],
    // },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema],

})

// messages: Message[]; ------------------------------------------------

// This means each user has array of messages embedded inside user document.

// So MongoDB document will look like:

// {
//   username: "dev",
//   email: "dev@gmail.com",
//   password: "hashedpass",
//   isVerified: true,
//   messages: [
//       {
//         content: "Hello",
//         createdAt: Date
//       },
//       {
//         content: "Nice website",
//         createdAt: Date
//       }
//   ]
// }

// This is called: Embedded Documents / Subdocuments
// -----------------------------------------------------------------------

// 6. now do export in nextjs style
// const UserModel = () || ();
const User = (mongoose.models.User as mongoose.Model<IUser> ) || mongoose.model<IUser>("User", UserSchema);

export default User;

// This line is EXTREMELY important in Next.js.

// Problem in Next.js

// Next.js reloads files many times → model gets created again → error:

// Cannot overwrite `User` model once compiled.
// Solution:
// If model already exists → use it
// Else → create new model

// So this line means:

// If mongoose.models.User exists
//     use existing model
// Else
//     create new model