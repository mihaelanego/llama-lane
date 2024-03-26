import { OLLAMA_AUTH, OLLAMA_ENDPOINT } from "./config";
import { PromptOutput, parsePromptOutput, prompt } from "./prompt";

export async function extractAddressFromText(
  text: string
): Promise<PromptOutput> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  const response = await fetch(OLLAMA_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${OLLAMA_AUTH}`,
    },
    body: JSON.stringify({
      model: "mistral",
      prompt: prompt(text),
      stream: false,
    }),
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (!response.ok) {
    throw new Error(`Failed to extract address: ${response.statusText}`);
  }

  const json = (await response.json()) as any;

  return parsePromptOutput(json.response);
}
