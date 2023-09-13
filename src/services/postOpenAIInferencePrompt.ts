import OpenAI from "openai";
import Suggestion from "@/types/Suggestion";

interface PromptOptions {
  pageContent: string;
  content: string;
  openAIKey: string;
  numCompletions?: number;
}
export default async function postOpenAIInferencePrompt({
  pageContent,
  content,
  openAIKey,
  numCompletions = 3,
}: PromptOptions): Promise<Suggestion[]> {
  const openai = new OpenAI({
    apiKey: openAIKey,
    dangerouslyAllowBrowser: true,
  });

  const prompt = `
Use the following to assist in completing the following passage:
${pageContent.slice(0, 8000)}

Passage to complete:
${content.trim()}`;

  try {
    const chatcompletions = await openai.chat.completions.create({
      messages: [{
        role: "user",
        content: prompt,
      }],
      n: numCompletions,
      max_tokens: 64,
      temperature: 0.8,
      model: "gpt-3.5-turbo",
    });

    return chatcompletions.choices.map(({ message: { content } }) => {
      return (content || "").replace(/\\n/, "\n").trim();
    });
  } catch (err) {
    console.error(err);
    return [];
  }
}
