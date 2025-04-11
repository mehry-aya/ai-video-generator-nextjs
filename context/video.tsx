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

    const handleSubmit = () => {
        const videoData = {
            story: selectedStory || "Custom Prompt",
            style: selectedStyle,
            prompt: customPrompt || selectedStory,
        };
        // createVideoAi(videoData);
        console.log(videoData); // For testing purposes
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
