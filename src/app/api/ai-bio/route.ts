import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_STUDIO_API;

const genAI = new GoogleGenerativeAI(apiKey || "");
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0,
    maxOutputTokens: 1000,
  },
});

export async function POST(req: Request) {
  const { input } = await req.json();

  // Handle empty input immediately
  if (!input?.trim()) {
    return new Response(
      JSON.stringify({ content: "Please provide some input about your skills and interests." }),
      { status: 200 }
    );
  }

  try {
    const prompt = `You are an expert developer bio writer. Create a concise two-line bio using these details:
Skills/Interests: ${input}
Guidelines:
- Focus on specific technical skills and passions
- Keep it professional but engaging
- Maximum 2 short lines`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    return new Response(JSON.stringify({ content }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to generate bio" }),
      { status: 500 }
    );
  }
}