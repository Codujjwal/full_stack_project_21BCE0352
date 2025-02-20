import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function generateTaskSuggestions(title: string): Promise<{ suggestions: string[] }> {
  if (!openai) {
    console.warn("OpenAI API key not configured. AI suggestions are disabled.");
    return { suggestions: [] };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a task management expert. Generate 3 suggestions to break down or improve this task. Return JSON in format: { suggestions: string[] }"
        },
        {
          role: "user",
          content: title
        }
      ],
      response_format: { type: "json_object" }
    });

    if (!response.choices[0].message.content) {
      return { suggestions: [] };
    }

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI API error:", error);
    return { suggestions: [] };
  }
}