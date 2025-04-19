import React from "react";
import { Composition } from "remotion";
import RemotionVideo from "@/components/video/remotion-video";


export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="Empty"
                // Import the component and add the properties you had in the `<Player>` before
                component={RemotionVideo}
                durationInFrames={60}
                fps={30}
                width={1280}
                height={720}
            />
        </>
    );
};
