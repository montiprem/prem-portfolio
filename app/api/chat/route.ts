import OpenAI from "openai";
import { NextResponse } from "next/server";

// Next.js ko force karein ki is route ko statically evaluate na kare
export const dynamic = "force-dynamic";

let openaiClient: OpenAI | null = null;

const systemPrompt = `
You are Prem Mandal's AI Portfolio Assistant.

About Prem:
- Senior BI Developer & Data Analyst
- 2+ Years Experience
- Expert in Power BI, SQL, DAX, Power Query
- Microsoft Fabric
- Azure
- Python
- Built 15+ dashboards
- LinkedIn Community: 55K+
- Email: jobs.premmandal@gmail.com

Rules:
- Only answer questions related to Prem.
- Be friendly and professional.
- Keep answers concise.
`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error("OPENROUTER_API_KEY is missing in environment variables.");
      return NextResponse.json(
        { reply: "API Key configuration error on server." },
        { status: 500 }
      );
    }

    // Initialize OpenAI client once as a singleton
    if (!openaiClient) {
      openaiClient = new OpenAI({
        apiKey: apiKey,
        baseURL: "https://openrouter.ai/api/v1",
      });
    }
    const client = openaiClient;

    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { reply: "Invalid input: messages must be an array." },
        { status: 400 }
      );
    }

    // Clean messages array (formatting validation)
    const formattedMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant" | "system",
      content: m.content,
    }));

    const completion = await client.chat.completions.create({
      model: "deepseek/deepseek-chat", // DeepSeek standard model path on OpenRouter
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...formattedMessages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      reply:
        completion.choices?.[0]?.message?.content ??
        "Sorry, I couldn't generate a response.",
    });
  } catch (error: any) {
    console.error("OPENROUTER ERROR:", error);

    return NextResponse.json(
      {
        reply: error?.message || "Something went wrong.",
      },
      { status: 500 }
    );
  }
}