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

  const calculateOpacity = (
    index: number,
    frame: number,
    startFrame: number,
    endFrame: number
  ) => {
    if (startFrame >= endFrame) {
      return 1; // default opacity
    }

    const inputRange = [startFrame, startFrame + 50, endFrame - 50, endFrame];

    const uniqueInputRange = Array.from(new Set(inputRange)).sort(
      (a, b) => a - b
    );

    return index === 0 ? 1 : interpolate(frame, uniqueInputRange, [0, 1, 1, 0]);
  };

  const calculateScale = (
    frame: number,
    startFrame: number,
    totalDuration: number
  ): number => {
    return interpolate(
      frame,
      [startFrame, startFrame + totalDuration],
      [1, 1.5],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
  };


  return (
    <AbsoluteFill>
      {images.map((image, index) => {
        // Calculate the start and end frames for this image
        const startFrame = (index * totalDuration) / images.length;
        const endFrame = startFrame + totalDuration;
        const opacity = calculateOpacity(index, frame, startFrame, endFrame);
        const scale = calculateScale(frame, startFrame, totalDuration);
        // Calculate the opacity for the fade-in effect
        // const opacity =
        //   index === 0
        //     ? 1 // First image is fully visible 
        //     : interpolate(
        //       frame,
        //       [startFrame, startFrame + 50, endFrame - 50, endFrame],
        //       [0, 1, 1, 0]
        //     );

        // const calculateScale = interpolate(
        //   frame,
        //   [startFrame, startFrame + totalDuration / 2, endFrame],
        //   [1, 1.8, 1], // Zoom in to 1.8 and then back to 1
        //   {
        //     extrapolateRight: "clamp",
        //     extrapolateLeft: "clamp",
        //   }
        // );


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
                // transform: `scale(${calculateScale})`, // Apply zoom in and out
                transform: `scale(${scale})`,
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
