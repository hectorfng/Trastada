import { GoogleGenAI } from "@google/genai";
import { getTranslations, Language } from '../localization';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, we will use a placeholder or log an error.
  console.error("Gemini API key not found in environment variables.");
}

const apiKey = process.env.REACT_APP_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateChallenge(age: number, lang: Language): Promise<string> {
  const t = getTranslations(lang);
  if (!API_KEY) {
    return Promise.resolve(t.fallbackChallenge1);
  }

  try {
    const prompt = t.geminiPrompt(age);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.9,
        // Increased maxOutputTokens and added a thinkingBudget to reserve tokens for the actual response.
        // This prevents the model from using all tokens for "thinking" and returning an empty response.
        maxOutputTokens: 100,
        thinkingConfig: { thinkingBudget: 25 },
      }
    });

    const text = response.text;
    
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
