import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL || "llama3-70b-8192";

/**
 * Sends a user message to Groq and returns the assistant's reply.
 *
 * @param {string} userMessage - The text received from the Viber user.
 * @returns {Promise<string>} - The AI generated response.
 */
export async function askGroq(userMessage) {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: MODEL,
        messages: [
          { role: "system", content: "You are a helpful assistant named Kaiser." },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        }
      }
    );

    const choice = response?.data?.choices?.[0];
    if (!choice?.message?.content) {
      throw new Error("Invalid response structure from Groq");
    }
    return choice.message.content.trim();
  } catch (err) {
    console.error("Groq request failed:", err.message);
    throw err;
  }
}