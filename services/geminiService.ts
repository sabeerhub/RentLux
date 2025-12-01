import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { MOCK_PROPERTIES } from '../constants';

const apiKey = process.env.API_KEY || '';
// Initialize client only if key exists (handled gracefully in UI if missing)
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Context for the AI to understand the available listings
const SYSTEM_INSTRUCTION = `
You are 'LuxBot', the helpful AI assistant for RentLux, a housing platform exclusively for Dutse, Jigawa State, Nigeria.
Your goal is to help students (Federal University Dutse, Jigawa Poly) and NYSC Corpers find accommodation in Dutse.
Always be friendly, use Nigerian slang occasionally (like "No wahala", "I got you", "Chop life"), but keep it professional.
Currency is Naira (₦).

Here is the current database of available properties in Dutse JSON format:
${JSON.stringify(MOCK_PROPERTIES)}

If a user asks for a recommendation, check the list above. If you find a match, mention the property name, price, and why it fits.
If the user asks about other cities (Lagos, Abuja, etc.), politely inform them that RentLux currently ONLY operates in Dutse, Jigawa State.
Key locations in Dutse to know: FUD (Federal University Dutse), Takur, Gida Dubu, GRA, Yadi, Jigawa State Poly.

Keep responses concise (under 100 words) unless asked for details.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!ai) {
    return "I'm sorry, my brain (API Key) is missing right now! Please check the configuration.";
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "I'm having trouble thinking right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Omo, network is acting up or something went wrong. Try again small time.";
  }
};