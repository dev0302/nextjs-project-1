// here we are writing some types like apiResponse, means how a response will always looks like, the main purpose is to get suggestions while writing code and for good production rules.

// 2. now for messages array we already have some interface so importing it.
import { Message } from "../models/User";

// 1. writing generic interface for api response
export interface ApiResponse<T = null> {
    success: boolean;
    message: string;
    data?:T;
}

// T = null -> “If no type is provided for T, assume T is null.”