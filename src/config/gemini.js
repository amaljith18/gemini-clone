import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const API_KEY = "AIzaSyAnqHDOh1kazPEYt2G8konFVETRd6bEeh8";

const MODEL_NAME = "gemini-1.5-flash";

const genAI = new GoogleGenerativeAI(API_KEY);

async function runChat(prompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
    });

    const chat = model.startChat({
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },

      // ✔ CORRECT SAFETY SETTINGS
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],

      history: [],
    });

    const result = await chat.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong while generating response.";
  }
}

export default runChat;
