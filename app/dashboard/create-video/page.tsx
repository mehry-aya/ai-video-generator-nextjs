"use client";
import React from "react";
import { useVideo } from "@/context/video";
export default function CreateVideo() {
 const { script, setScript } = useVideo();
 return (
 <div className="p-10">
 <h1 className="text-2xl font-bold mb-5">Create Video</h1>
 <pre>
 <code>{JSON.stringify(script)}</code>
 </pre>
 </div>
 );
}
