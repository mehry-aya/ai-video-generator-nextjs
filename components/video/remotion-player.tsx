import React from "react";
import { Player } from "@remotion/player";
import RemotionVideo from "@/components/video/remotion-video";

export default function RemotionPlayer() {
    return (
        <div>
            <Player
                component={RemotionVideo}
                durationInFrames={120} // 120 = 4 seconds for each image
                compositionWidth={300}
                compositionHeight={450}
                fps={30}
                inputProps={{}}
                controls={true}
            />
        </div>
    );
}