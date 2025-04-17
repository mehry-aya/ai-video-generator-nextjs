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
    textContent: string;
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

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setLoadingMessage("Generating video script...");

            //Step 1: Create video script
            const videoResponse: any = await createAiVideo(
                `Create a 30 second long 
                ${customPrompt || selectedStory
                } video script. Include AI imagePrompt for each scene in ${selectedStyle} format. Provide the result in JSON format with 'imagePrompt' and 'contentText' fields.`
            );

            if (!videoResponse.success) {
                setLoading(false);
                setLoadingMessage("Failed to generate video script");
            }
            console.log("Video Response: ", videoResponse);
            if (videoResponse.data.length >= 1) {
                setLoadingMessage("Generating images from the script...");
                const imageFenerationPromises = videoResponse.data.map(async (item: VideoScriptItem) => {
                    try {
                        const imageUrl = await generateImageAi(item.imagePrompt);
                        return imageUrl;
                    } catch (error) {
                        console.error("Error generating image: ", error);
                        return null; // Return null in case of error
                    }
                });
                const images = await Promise.all(imageFenerationPromises);
                const validImages = images.filter((image) => image !== null); // Filter out null values
                setImages(validImages);
            }


            // Step 2: Create video images
            // Step 3: Save Images to Cloudinary
            // Step 4: Convert Script to Speech using Google Cloud
            // Step 5: Save Audio to Cloudinary
            // Step 6: Generate Captions from Audio using Assembly AI


        } catch (error) {
            console.error(error);
            setLoadingMessage("failed to generate video script");
        } finally {
            setLoading(false);
            setLoadingMessage("");
        }

    };


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
