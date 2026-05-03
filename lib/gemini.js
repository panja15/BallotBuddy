// file: lib/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite-preview",
});

/**
 * Generates a response from Gemini based on user input and context.
 * @param {string} prompt - The final formatted prompt.
 * @returns {Promise<string>} - The AI generated response.
 */
export async function generateResponse(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate response from AI.");
  }
}
