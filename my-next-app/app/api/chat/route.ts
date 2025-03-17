import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // System prompt to guide the AI in helping users build apps
  const systemPrompt = `You are an expert app development assistant. Help users build real-world applications by providing:
  
  1. Clear step-by-step guidance
  2. Detailed code examples with explanations
  3. File structure recommendations
  4. Deployment instructions
  5. Best practices and tips
  
  Focus on practical, implementable solutions using modern frameworks like Next.js, React, Vue, etc.
  When providing code, use markdown code blocks with appropriate language tags.
  Always consider performance, accessibility, and security in your recommendations.`

  const result = streamText({
    model: openai("gpt-4o"),
    messages: [{ role: "system", content: systemPrompt }, ...messages],
  })

  return result.toDataStreamResponse()
}

