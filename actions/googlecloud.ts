/**  This file  use Google text to speech.

We give the the text and based on that it will generate the MP3.

And then we upload that to Cloudinary so that it is permanently for us to use.
*/

"use server"
import cloudinary from "@/lib/cloudinary";
import { nanoid } from "nanoid";
const textToSpeech = require("@google-cloud/text-to-speech");

export async function generateAudio(text: string) {
    const client = new textToSpeech.TextToSpeechClient({
        apiKey: process.env.GOOGLE_API_KEY,
    });

    // Add a short pause at the end of the text
    const textWithPause = text + '. <break time="500ms"/>';
    const request = {
        input: { ssml: `<speak>${textWithPause}</speak>` },
        voice: {
            languageCode: "en-US",
            name: "en-US-Wavenet-F", // or "en-US-Neural2-F" for WaveNet (Tiktok voices)
            ssmlGender: "MALE",
        },
        audioConfig: { audioEncoding: "MP3" },
    };

    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    const audioBuffer = response.audioContent;


    // Generate a unique ID for the file name
    const fileName = nanoid(6);
    // Return a promise to handle Cloudinary upload
    return new Promise((resolve, reject) => {
        // Create a Cloudinary upload stream
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "video", public_id: fileName },
            (error: any, result: any) => {
                if (error) {
                    console.error("Error uploading to Cloudinary:", error);
                    return reject(new Error("Upload to Cloudinary failed"));
                }
                // Log and resolve with the Cloudinary URL
                if (result) {
                    console.log("Audio uploaded to Cloudinary:", result.secure_url);
                    resolve({ url: result.secure_url });
                } else {
                    reject(new Error("No result returned from Cloudinary upload"));
                }
            }
        );
        // Stream the audio buffer to Cloudinary's uploader
        uploadStream.end(audioBuffer);
    });
}


