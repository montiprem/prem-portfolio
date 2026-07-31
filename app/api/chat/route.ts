import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Extract the latest user message
    const latestMessage = messages[messages.length - 1].content;

    // System instruction & Portfolio context
    const systemInstruction = `
      You are an AI portfolio assistant for Prem Mandal. 
      Prem Mandal is a Senior BI Developer & Data Analyst based in Kolkata, India, with over 2 years of experience.
      He specializes in Power BI, SQL, DAX, Power Query, Microsoft Fabric, Azure, and Python.
      He has built 15+ dashboards, worked with companies like Super Smelters Ltd, Bhauram Jodhraj Pvt Ltd, and currently works at Utkarsh India Ltd.
      He also has an active LinkedIn community of over 55K+ followers.
      Your job is to answer visitors' questions about Prem's skills, experience, projects, and how to contact him (jobs.premmandal@gmail.com). 
      Keep your answers concise, professional, friendly, and focused on tech/data analytics.
    `;

    // Using gemini-1.5-flash (stable and highly reliable)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
    });

    const result = await model.generateContent(latestMessage);
    const response = await result.response;
    const reply = response.text() || "Sorry, I couldn't process that.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}