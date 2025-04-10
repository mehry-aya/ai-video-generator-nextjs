"use server";

const { GoogleGenerativeAI } = require("@google/generative-ai");
//   const fs = require("node:fs");
//   const mime = require("mime-types");

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const defaultMessage = "Create a 30 second long ADVENTURE STORY video script. Include AI image prompts in FANTASY FORMAT for each scene in realistic format. Provide the result in JSON format with 'image' and 'text' fields.";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
};

export async function createAiVideo(message: string = defaultMessage) {
    const chatSession = model.startChat({
        generationConfig,
    });

    const result = await chatSession.sendMessage(message);

    const response = result.response.text();
    const cleanedResponse = response.replace(/```json|\n```/g, "").trim();
    let jsonResponse;
    try {
        jsonResponse = JSON.parse(cleanedResponse);
        console.log(`Response: ${jsonResponse}`);

    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
    console.log(jsonResponse);
    return jsonResponse;

}

