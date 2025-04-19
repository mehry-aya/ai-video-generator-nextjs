"use client";
import React from "react";
import { useVideo } from "@/context/video";
import { createAiVideo } from "@/actions/geminiai";
import { Button } from "@/components/ui/button";
import { storyOptions, styleOptions } from "@/constants";
import Image from "next/image";
import { Loader2Icon } from "lucide-react";
import LoadingModal from "@/components/modal/loading";
export default function CreateVideo() {
    const { selectedStory, selectedStyle, customPrompt, handleStorySelect, handleStyleSelect, handleCustomPromptChange, handleSubmit, loading, images, audio, captions } = useVideo();
    return (
        <div className="p-10 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold mb-5">Create Video</h1>
            {/* Story Options */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">
                    Select a Story Type or Enter Custom Prompt
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {storyOptions.map((story) => (
                        <div key={story.label} className="h-auto">
                            {story.type === "custom" ? (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Enter your custom prompt"
                                        value={customPrompt}
                                        onChange={handleCustomPromptChange}
                                        className={`h-12 w-full bg-gray-700 text-white border-2 ${selectedStory === "Custom Prompt"
                                                ? "border-blue-500"
                                                : "border-gray-600"
                                            } focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                </>
                            ) : (
                                <Button
                                    onClick={() => handleStorySelect(story.label)}
                                    variant="outline"
                                    className={`h-12 w-full text-xs sm:text-sm lg:text-base xl:text-lg py-1 px-2 ${selectedStory === story.label
                                            ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:text-white"
                                            : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600 hover:text-white"
                                        }`}
                                >
                                    <span className="line-clamp-2">{story.label}</span>
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>


            {/* Style Options */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">
                    Select A Video Style
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {styleOptions.map((style) => (
                        <div key={style.name} onClick={() => handleStyleSelect(style.name)}
                            className={`relative cursor-pointer rounded-lg transition-all duration-200 aspect-square overflow-hidden ${selectedStyle === style.name
                                    ? "ring-4 ring-blue-500 ring-offset-4 ring-offset-gray-800"
                                    : "hover:scale-105"
                                }`}>
                            <Image
                                src={style.image}
                                alt={style.name}
                                fill
                                style={{ objectFit: "cover" }}
                                className={` transition-transform duration-200 ${selectedStyle === style.name ? "scale-105" : ""

                                    }`}
                            />

                            <div className={`absolute inset-0 flex items-center justify-center transiton-opacity duration-200 ${selectedStyle === style.name
                                    ? "bg-transparent" : "bg-black/40"}`}
                            >
                                <span className="font-semibold text-white text-lg">{style.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Submit Button */}
            <Button
                onClick={handleSubmit}
                disabled={(!selectedStory && !customPrompt) || !selectedStyle}
                className="w-full h-12 bg-green-500 text-white text-lg rounded hover:bg-green-600"
            >
                { loading && <Loader2Icon size={24} className="mr-4 animate-spin" />} {" "} 
                Create Video
            </Button>
            {/* Loading Spinner */}
            <LoadingModal />
            <pre>{JSON.stringify(images, null, 4)}</pre>
            <pre>{JSON.stringify(audio, null, 4)}</pre>
            <pre>{JSON.stringify(captions, null, 4)}</pre>
        </div>
    );

}
