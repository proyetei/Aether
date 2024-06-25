import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import {OpenAI} from "openai"

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth();
        const {dream, experience} = await req.json();
        if (!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }
        if (!openai.apiKey){
            return new NextResponse("OpenAI API key not configured", {status: 500});
        }
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
            {
                role: "system",
                content: `Analyze the the dream entries and the experience entries to find any themes between the user's thoughts in their journal and unconscious mind of their dreams.
                If a correlation or theme exists, give a comprehensive report of it. If no correlation exists, state that no correlation was found. If one of the entries received is undefined, state that one of the entries is missing.`,
            },
            {
                role: "user",
                content: `Use the following text given below.
                \n\n\nDreams:\n${dream}\n\n\nExperiences:\n${experience}
                Display the analysis in the following format:

                Analysis:

                Correlation between dream journal and experience journal:

                If the theme is negative, only then, give suggestions for mental health improvement, if the theme is positive, state "Keep up the good work", if one of the entries is missing meaning that one of the entries was found undefined, state that one of the entries is missing.
                `,
            }
        ],
        });
        return NextResponse.json(response.choices[0].message);
    } catch (error) {
        console.log("[API_ERROR]", error);
        return new NextResponse("Internal server error", {status: 500});
    }

}