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
   

    // const jsonResponse = [
    //     {
    //         imagePrompt: 'A lone, weathered adventurer stands on a cliff overlooking a vast, mystical forest, bathed in the golden light of a setting sun. The adventurer is clad in worn leather armor, carrying a sword and a backpack.',
    //         contentText: "The wind whipped at Elara's cloak, carrying the scent of pine and magic. Below, the Whispering Woods stretched out like a tapestry of emerald and gold, a place of ancient secrets and whispered dangers."
    //     },
    //     {
    //         imagePrompt: "A close-up of the adventurer's hand, gripping a worn leather-bound journal. The pages are filled with cryptic symbols and sketches of fantastical creatures.",
    //         contentText: "She opened her journal, its pages filled with the scribbles of her travels. The map she'd been given pointed to a hidden temple within the woods, rumored to hold the key to a lost power."
    //     },
    //     {
    //         imagePrompt: 'The adventurer cautiously steps into the shadowy depths of the forest. The trees are gnarled and ancient, their branches reaching out like grasping claws. Strange, luminous mushrooms illuminate the path.',
    //         contentText: 'With a deep breath, Elara stepped into the forest. The air grew heavy with the scent of damp earth and the faint, metallic tang of magic.'
    //     },
    //     {
    //         imagePrompt: 'A shadowy figure emerges from behind a giant, mosscovered tree. The figure is shrouded in a cloak, holding a glowing staff. The adventurer draws her sword.',
    //         contentText: 'A sudden rustle in the undergrowth made her jump. A cloaked figure emerged from the shadows, a staff glowing in their hand. Elara gripped her sword, ready for a fight.'
    //     }
    // ]

    try {
        jsonResponse = JSON.parse(cleanedResponse);
        if(jsonResponse) {
            return {
                success: true,
                data: jsonResponse,
            };
        }
       

    } catch (error) {
        console.error(error);
        return {
            success: false,
            data: "",
        }
}
}




