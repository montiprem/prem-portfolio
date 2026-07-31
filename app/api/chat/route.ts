import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

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
    console.log(
      "OPENROUTER KEY:",
      process.env.OPENROUTER_API_KEY ? "FOUND ✅" : "NOT FOUND ❌"
    );

    const { messages } = await req.json();

    const completion = await client.chat.completions.create({
      model: "deepseek/deepseek-chat-v3.1",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages,
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
    console.error("OPENROUTER ERROR:");
    console.error(error);

    return NextResponse.json(
      {
        reply: error?.message || "Something went wrong.",
      },
      { status: 500 }
    );
  }
}