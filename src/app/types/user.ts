import { Message } from "../models/User";

export interface SafeUser {
    id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
}

