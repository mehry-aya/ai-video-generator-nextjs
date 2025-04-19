import { useVideo } from '@/context/video';
import React from 'react'
import { AbsoluteFill, Sequence, Img, useVideoConfig, Audio } from 'remotion'

export default function RemotionVideo() {
  const { images, audio, captions } = useVideo();

  // Calculate total duration based on captions
  const totalDuration =
    captions.length > 0
      ? Math.ceil((captions[captions.length - 1] as any).end / (1000 /
        30)) + 30 // Add 30 frames for an additional second
      : 1; // Default to 1 frame if no captions
  return (
    <AbsoluteFill>
      {images.map((image, index) => (
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
            }}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  )
}
