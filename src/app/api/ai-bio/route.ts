import Anthropic from "@anthropic-ai/sdk";

const api = process.env.CLAUDE_API;

const anthropic = new Anthropic({
    apiKey: api,
});

export async function POST(req: Request) {
  const { input } = await req.json();
  try {
      const msg = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 1000,
          temperature: 0,
          system: "You are an expert at writing concise 2 liner  bios for developers. When the user provides their skills and interests, be specific. if input is empty response please give some input",
          messages: [
              {
                  "role": "user",
                  "content": [
                      {
                          "type": "text",
                          "text": input || "hello",
                      },
                  ],
              },
          ],
      });

      //@ts-ignore
      const content = msg.content[0]?.text || 'No content available';
      return new Response(JSON.stringify({ content }), { status: 200 });
  } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: 'Failed to generate bio' }), { status: 500 });
  }
}
