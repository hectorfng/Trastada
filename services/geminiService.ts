import { GoogleGenerativeAI } from "@google/generative-ai";
import { getTranslations, Language } from '../localization';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';



if (!apiKey) {
  console.error("Gemini API key not found in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash", // Using 1.5-flash as it's the newer model
  generationConfig: {
    temperature: 0.9,
    maxOutputTokens: 100,
  }
});

export async function generateChallenge(age: number, lang: Language): Promise<string> {
  const t = getTranslations(lang);
  if (!apiKey) {
    return Promise.resolve(t.fallbackChallenge1);
  }

  try {
    const prompt = t.geminiPrompt(age);
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    if (text) {
      // Basic cleanup in case the model adds quotes
      return text.trim().replace(/^"|"$/g, '');
    } else {
      console.error("Gemini response did not contain text. Response was:", JSON.stringify(response, null, 2));
      return t.fallbackChallenge2;
    }

  } catch (error) {
    console.error("Error generating challenge from Gemini:", error);
    // Provide a fallback challenge
    return t.fallbackChallenge2;
  }
}
