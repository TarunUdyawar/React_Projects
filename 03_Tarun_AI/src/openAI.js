

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyASPCHFCyZN6DqYQ4KZnEiKwzzb_QCP76k" });

export async function sendMsgtoAi(message) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: message,
  });
  return response.text

}

