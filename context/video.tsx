"use client";
import {
    useState,
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    ReactNode,
    ChangeEvent,
} from "react";

import { createAiVideo } from "@/actions/geminiai";
import { generateImageAi } from "@/actions/replicateai";
import { generateAudio } from "@/actions/googlecloud";
import { generateCaptions } from "@/actions/assemblyai";

// const aiVideoScript =
//     [
//         {
//             imagePrompt: 'A lone, weathered adventurer stands on a cliff overlooking a vast, mystical forest, bathed in the golden light of a setting sun. The adventurer is clad in worn leather armor, carrying a sword and a backpack.',
//             contentText: "The wind whipped at Elara's cloak, carrying the scent of pine and magic. Below, the Whispering Woods stretched out like a tapestry of emerald and gold, a place of ancient secrets and whispered dangers."
//         },
//         {
//             imagePrompt: "A close-up of the adventurer's hand, gripping a worn leather-bound journal. The pages are filled with cryptic symbols and sketches of fantastical creatures.",
//             contentText: "She opened her journal, its pages filled with the scribbles of her travels. The map she'd been given pointed to a hidden temple within the woods, rumored to hold the key to a lost power."
//         },
//         {
//             imagePrompt: 'The adventurer cautiously steps into the shadowy depths of the forest. The trees are gnarled and ancient, their branches reaching out like grasping claws. Strange, luminous mushrooms illuminate the path.',
//             contentText: 'With a deep breath, Elara stepped into the forest. The air grew heavy with the scent of damp earth and the faint, metallic tang of magic.'
//         },
//         {
//             imagePrompt: 'A shadowy figure emerges from behind a giant, mosscovered tree. The figure is shrouded in a cloak, holding a glowing staff. The adventurer draws her sword.',
//             contentText: 'A sudden rustle in the undergrowth made her jump. A cloaked figure emerged from the shadows, a staff glowing in their hand. Elara gripped her sword, ready for a fight.'
//         }
//     ];
// //once you see the images response, put in state to avoid generating more during development
// const aiImages = [

//     "https://res.cloudinary.com/dcx5ardvm/image/upload/v1744924374/ai_video_images/7G0LhI3BmNl9t7cI2f7-G.png",
//     "https://res.cloudinary.com/dcx5ardvm/image/upload/v1744924420/ai_video_images/VAtXnYcD43aWjogZKZyuI.png",
//     "https://res.cloudinary.com/dcx5ardvm/image/upload/v1744924445/ai_video_images/aoytCGQc4MBVIqHvp-2mI.png",
//     "https://res.cloudinary.com/dcx5ardvm/image/upload/v1744924473/ai_video_images/DerU3UcZLCXx1QgBAlGOH.png"
// ]



const initialState = {
    script: "script....",
    images: [] as string[],
    audio: "",
    captions: [] as object[],
    loading: false,
    tory: "Adventure Story",
    selectedStyle: "Fantasy",

};

// context value type
interface VideoContextType {
    script: string;
    images: string[];
    audio: string;
    captions: object[];
    loading: boolean;
    loadingMessage: string;
    setLoadingMessage: Dispatch<SetStateAction<string>>;
    setScript: Dispatch<SetStateAction<string>>;
    setImages: Dispatch<SetStateAction<string[]>>;
    setAudio: Dispatch<SetStateAction<string>>;
    setCaptions: Dispatch<SetStateAction<object[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    selectedStory: string;
    selectedStyle: string;
    customPrompt: string;
    handleStorySelect: (story: string) => void;
    handleStyleSelect: (style: string) => void;
    handleCustomPromptChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
}

interface VideoScriptItem {
    imagePrompt: string;
    contentText: string;
}

// create context
const VideoContext = createContext<VideoContextType | undefined>(
    undefined
);
// create provider component
export const VideoProvider = ({ children }: { children: ReactNode }) => {
    // state
    const [script, setScript] = useState(initialState.script); // gemini
    const [images, setImages] = useState(initialState.images); // replicate
    const [audio, setAudio] = useState(initialState.audio); // google cloud text-to-speech
    const [captions, setCaptions] = useState(initialState.captions); //assemblyai
    const [loading, setLoading] = useState(initialState.loading);
    const [loadingMessage, setLoadingMessage] = useState("")
    // add state to create a new video
    const [selectedStory, setSelectedStory] = useState("");
    const [selectedStyle, setSelectedStyle] = useState("");
    const [customPrompt, setCustomPrompt] = useState("");
    // 4 functions to handle event change and submit

    const handleStorySelect = (story: string) => {
        setSelectedStory(story);
        if (story !== "Custom Prompt") {
            setCustomPrompt("");
        }
    };
    const handleStyleSelect = (style: string) => {
        setSelectedStyle(style);
    };
    const handleCustomPromptChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCustomPrompt(e.target.value);
        setSelectedStory("Custom Prompt");
    };

    // const handleSubmit = async () => {
    //     try {
    //         setLoading(true);
    //         setLoadingMessage("Generating video script...");

    //         //Step 1: Create video script
    //         const videoResponse: any = await createAiVideo(
    //             `Create a 30 second long 
    //             ${customPrompt || selectedStory
    //             } video script. Include AI imagePrompt for each scene in ${selectedStyle} format. Provide the result in JSON format with 'imagePrompt' and 'contentText' fields.`
    //         );

    //         if (!videoResponse.success) {
    //             setLoading(false);
    //             setLoadingMessage("Failed to generate video script");
    //         }
    //         console.log("Video Response: ", videoResponse);
    //         if (videoResponse.data.length >= 1) {
    //             setLoadingMessage("Generating images from the script...");
    //             const imageFenerationPromises = videoResponse.data.map(async (item: VideoScriptItem) => {
    //                 try {
    //                     const imageUrl = await generateImageAi(item.imagePrompt);
    //                     return imageUrl;
    //                 } catch (error) {
    //                     console.error("Error generating image: ", error);
    //                     return null; // Return null in case of error
    //                 }
    //             });
    //             const images = await Promise.all(imageFenerationPromises);
    //             const validImages = images.filter((image) => image !== null); // Filter out null values
    //             setImages(validImages);
    //         }


    //         // Step 2: Create video images
    //         // Step 3: Save Images to Cloudinary
    //         // Step 4: Convert Script to Speech using Google Cloud
    //         // Step 5: Save Audio to Cloudinary
    //         // Step 6: Generate Captions from Audio using Assembly AI


    //     } catch (error) {
    //         console.error(error);
    //         setLoadingMessage("failed to generate video script");
    //     } finally {
    //         setLoading(false);
    //         setLoadingMessage("");
    //     }

    // };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            // Create video script
            const videoScript: any = await generateVideoScript();
            const images = await generateImages(videoScript);
            const audioUrl = await generateAudioFile(videoScript);
            const captions = await generateCaptionsArray(audioUrl);
            // console.log("captions array => ", captions);

            if (videoScript && images && audioUrl && captions) {
                // save to db
            }
            setLoadingMessage("Your video is ready for preview...")
        } catch (error) {
            console.error(error);
            setLoadingMessage("Failed to generate video script");
        } finally {
            setLoading(false);
        }
    }

    const generateVideoScript = async () => {
        try {
            setLoadingMessage("Generating video script...");
            // Step 1: Create video script
            const videoResponse: any = await createAiVideo(
                `Create a 10 second long ${customPrompt || selectedStory
                } video script with 2 scenes. Include AI image prompts in ${selectedStyle} format for each scene. Provide the result in JSON format with 'imagePrompt' and 'contentText' fields.`
            );
            // console.log("videoResponse ==============> ", videoResponse);
            // Step 2: Check if videoResponse was successful
            if (!videoResponse.success) {
                setLoadingMessage("Failed to generate video script.");
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
                return null; // Return null on failure to indicate the operation failed
            }
            // Step 3: Optionally handle further processing, like generating images
            // Return the successful videoResponse
            return videoResponse;
        } catch (error) {
            console.error("Error generating video script:", error);
            setLoadingMessage("Error generating video script.");
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    // const generateImages = async (videoResponse: VideoScriptItem[]) => {
    //     setLoadingMessage("Generating images from the script...");
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             setImages(aiImages);
    //             resolve(aiImages);
    //         }, 5000);
    //     });
    // };

    const generateImages = async (videoResponse: any) => {
        setLoadingMessage("Generating images from the script...");
        try {
            // Video response is successful, proceed to image generation
            const imageGenerationPromises: Promise<string | null>[] = videoResponse.data.map(
                async (item: VideoScriptItem): Promise<string | null> => {
                    try {
                        // Capture the result of generateImageAi and return it
                        const imageUrl: string = await generateImageAi(item.imagePrompt);
                        return imageUrl; // Ensure the image URL is returned
                    } catch (error) {
                        console.error("Error generating image:", error);
                        return null; // Handle failure gracefully for a single image
                    }
                }
            );
            // Wait for all images to be generated
            const images: (string | null)[] = await Promise.all(imageGenerationPromises);
            // Filter out any null values in case some images failed
            const validImages: string[] = images.filter((image) => image !== null);
            // if (validImages.length === 0) {
            //     setLoadingMessage("Failed to generate images.");
            //     setLoading(false);
            //     return;
            // }
            console.log("Valid images: ", validImages);
            setImages(validImages);
            return validImages;
        } catch (error) {
            console.error(error);
        }
    };


    const generateAudioFile = async (
        videoScript: any
    ): Promise<string | undefined> => {
        setLoading(true);
        setLoadingMessage("Generating audio file...");
        try {
            // Use .map() to create an array of text items and join them into a single string
            const script = videoScript.data
                .map((item: { contentText: string }) => item.contentText) // Extract the text field from each item
                .join(" "); // Join the array into a single string with spaces
            console.log("script to generate audio => ", script);
            const data: any = await generateAudio(script);
            console.log("audio generated!", data);
            setAudio(data.url);
            return data.url;

            // const url = "https://res.cloudinary.com/dcx5ardvm/video/upload/v1745082026/_gitop.mp3";
            // setAudio(url);
            // return url;

        } catch (err) {
            console.error("Error generating audio file:", err);
            return undefined; // Return undefined in case of error
        }
    };

    const generateCaptionsArray = async (audioUrl: any) => {
        setLoadingMessage("Generating captions from audio...");

        try {
            const captionsArray = await generateCaptions(audioUrl);
            setCaptions(captionsArray);
            return captionsArray;
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <VideoContext.Provider
            value={{
                script,
                images,
                audio,
                captions,
                loading,
                setScript,
                setImages,
                setAudio,
                setCaptions,
                setLoading,
                loadingMessage,
                setLoadingMessage,
                selectedStory,
                selectedStyle,
                customPrompt,
                handleStorySelect,
                handleStyleSelect,
                handleCustomPromptChange,
                handleSubmit,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
};
// export useVideo hook
export const useVideo = (): VideoContextType => {
    const context = useContext(VideoContext);
    if (context === undefined) {
        throw new Error("useVideo must be used within a VideoProvider");
    }
    return context;
};
