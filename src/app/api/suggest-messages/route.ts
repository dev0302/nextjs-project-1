// here we going to intergrate open ai with our backend.

import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

// console.log("heyy");

// Initialize the Google AI client
// Note: In the 2026 SDK, GoogleGenAI is the standard entry point
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
// console.log(ai);

export async function GET(req: Request) {
    try {
        const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

        // Few-Shot Prompting: Providing context and examples for perfect output
        const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. 
        Each question should be separated by '||'. These questions are for an anonymous social messaging platform, 
        like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics. 
        For example: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. 
        Do not include any introductory or concluding text. Output only the string.`;

        // Modern 2026 SDK Method
        const response = await ai.models.generateContent({
            model: modelName,
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
        });
        console.log(response);
        

        // In the latest SDK, 'text' is a direct getter property (string | undefined)
        const rawText = response.text;

        if (!rawText) {
            return NextResponse.json(
                { success: false, message: "AI returned no content. Check safety filters." },
                { status: 400 }
            );
        }

        const cleanText = rawText.trim();

        return NextResponse.json({
            success: true,
            suggestions: cleanText
        }, { status: 200 });

    } catch (error: any) {
        console.error("Gemini API Error:", error);

        // Specific handling for common AI errors (Quota, Key, etc.)
        const errorMessage = error.message || "An unexpected error occurred with the AI service.";
        
        return NextResponse.json(
            { success: false, message: errorMessage },
            { status: 500 }
        );
    }
}


// to test in on browser url, first change POST to GET and then go on this url : "http://localhost:3000/api/suggest-messages".