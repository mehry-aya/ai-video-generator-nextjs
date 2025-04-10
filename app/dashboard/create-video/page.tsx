"use client";
import React from "react";
import { useVideo } from "@/context/video";
import {createAiVideo} from "@/actions/geminiai";
import { Button } from "@/components/ui/button";

export default function CreateVideo() {
 return (
    <div className="p-10">
    <h1 className="text-2xl font-bold mb-5">Create Video</h1>
    <div className="my-5">
    <Button onClick={() => createAiVideo()}>Create Video</Button>
    </div>
    </div>
    );
   
}
