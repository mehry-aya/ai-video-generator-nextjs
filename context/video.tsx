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
   