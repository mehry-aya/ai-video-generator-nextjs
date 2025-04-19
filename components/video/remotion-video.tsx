import { useVideo } from '@/context/video';
import React from 'react'
import { AbsoluteFill, Sequence, Img, useVideoConfig, Audio, useCurrentFrame, interpolate } from 'remotion'

export default function RemotionVideo() {
  const { images, audio, captions } = useVideo();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate total duration based on captions
  const totalDuration =
    captions.length > 0
      ? Math.ceil((captions[captions.length - 1] as any).end / (1000 /
        30)) + 30 // Add 30 frames for an additional second
      : 1; // Default to 1 frame if no captions

  const getCurrentCaptions = () => {
    const currentTime = (frame / fps) * 1000; // Convert frame to milliseconds
    const currentCaption = captions.find(
      (
        caption: any // Using 'any' here
      ) => currentTime >= caption.start && currentTime <= caption.end
    );
    return currentCaption ? (currentCaption as any).text : ""; // Cast to any to access text
  };

  return (
    <AbsoluteFill>
      {images.map((image, index) => {
        // Calculate the start and end frames for this image
        const startFrame = (index * totalDuration) / images.length;
        const endFrame = startFrame + totalDuration;
        // Calculate the opacity for the fade-in effect
        const opacity =
          index === 0
            ? 1 // First image is fully visible 
            : interpolate(
              frame,
              [startFrame, startFrame + 50, endFrame - 50, endFrame],
              [0, 1, 1, 0]
            );

        return (
          <Sequence
            key={index}
            from={(index * totalDuration) / images.length} // Start each sequence after the previous one
            durationInFrames={totalDuration} // Duration for each image
          >
            <Img
              src={image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                margin: "auto",
                opacity, // Apply the calculated opacity
              }}
            />
            <AbsoluteFill
              style={{
                justifyContent: "center", // Center vertically
                alignItems: "center", // Center horizontally
                display: "flex",
              }}
            >
              <h2 className='text-4xl text-white text-center'>{getCurrentCaptions()}</h2>
            </AbsoluteFill>
          </Sequence>
        );
      })}
      <Audio src={audio} />
    </AbsoluteFill>
  )
}
