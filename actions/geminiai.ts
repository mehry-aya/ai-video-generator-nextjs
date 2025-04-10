const {GoogleGenerativeAI} = require("@google/generative-ai");
  const fs = require("node:fs");
  const mime = require("mime-types");
  
  const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is not set.");
    }

    const defaultMessage ="Create a 30 second long ADVENTURE STORY video script. Include AI image prompts in FANTASY FORMAT for each scene in realistic format. Provide the result in JSON format with 'image' and 'text' fields.";

  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro-preview-03-25",
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
  
  async function createAiVideo(message: string = defaultMessage) {
    const chatSession = model.startChat({
      generationConfig,
    });
  
    const result = await chatSession.sendMessage(message);
    // TODO: Following code needs to be updated for client-side apps.
    const candidates = result.response.candidates;
    for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
      for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
        const part = candidates[candidate_index].content.parts[part_index];
        if(part.inlineData) {
          try {
            const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
            fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
            console.log(`Output written to: ${filename}`);
          } catch (err) {
            console.error(err);
          }
        }
      }
    }
    const response =result.response.text();
    console.log(`Response: ${response}`);
  }
  
