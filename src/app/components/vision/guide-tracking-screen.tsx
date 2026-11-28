import { StyleSheet, Text, View } from 'react-native'
import type { ImageBuffer } from 'react-native-executorch/cv'
import { Camera, useCameraDevice, useFrameOutput } from 'react-native-vision-camera'
import { type GPUFrame, useResizer } from 'react-native-vision-camera-resizer'
import { scheduleOnRN } from 'react-native-worklets'
import { YOLO_MODEL_INPUT_SIZE, type YoloDetector } from '@/src/vision/yolo'
import { useState } from 'react'
import type { ObjectDetection } from 'react-native-executorch'

type PersonDetection = ObjectDetection<'xyxy', string> & { readonly label: 'person' };

const styles = StyleSheet.create({
  boundingBox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#00FF00',
    borderRadius: 4,
  },
})

export default function GuideTrackingScreen({ detector }: { detector: YoloDetector }) {
    const device = useCameraDevice("back");
    if (device == null) {
        return <Failure error="Failed to set up the camera" />
    }
    const { detectObjectsWorklet } = detector
    const [peopleInFrame, setPeopleInFrame] = useState<PersonDetection[]>([]);
    const [viewSize, setViewSize] = useState({ width: 0, height: 0 })
    const [frameSize, setframeSize] = useState<{
        width: number, 
        height: number
    }>({ width: 0, height: 0 });

    const { resizer } = useResizer({
        ...YOLO_MODEL_INPUT_SIZE,
        channelOrder: "rgb",
        dataType: "uint8",
        scaleMode: "cover",
        pixelLayout: "interleaved", // gives the "hwc" layout ImageBuffer expects
    })

    const onDetections = (detections: PersonDetection[]) => {
        // console.log("Detected objects:", detections)
        setPeopleInFrame(detections);
    }

    const frameOutput = useFrameOutput({
        pixelFormat: "yuv",
        dropFramesWhileBusy: true,
        onFrame(frame) {
            "worklet"
            if (!resizer || !detectObjectsWorklet) {
                frame.dispose()
                return
            }
            let resized: GPUFrame | undefined
            try {
                resized = resizer.resize(frame) // GPU resize + YUV -> RGB
                const data = new Uint8Array(resized.getPixelBuffer())
                const input: ImageBuffer = { data, ...YOLO_MODEL_INPUT_SIZE, format: "rgb", layout: "hwc" }

                setframeSize({ width: frame.width, height: frame.height })

                const detections = detectObjectsWorklet(input) // synchronous, on the worklet thread
                const isPerson = (d: ObjectDetection<'xyxy', string>): d is PersonDetection => d.label === 'person'
                scheduleOnRN(onDetections, detections.filter(isPerson))
            } catch {
                // camera unmounted or frame closed mid-flight
            } finally {
                resized?.dispose()
                frame.dispose()
            }
        },
    })

    return (
        <View style={{ flex: 1 }} onLayout={(e) => setViewSize(e.nativeEvent.layout)}>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive
                outputs={[frameOutput]}
            />
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
                {peopleInFrame.map((p, i) => (
                    <View
                        key={i}
                        style={[
                        styles.boundingBox,
                        modelToView(p.box, frameSize.width, frameSize.height, viewSize.width, viewSize.height),
                        ]}
                    />
                ))}
            </View>
        </View>
    )
}

function modelToView(
  b: { xmin: number; ymin: number; xmax: number; ymax: number },
  frameW: number, frameH: number, viewW: number, viewH: number,
) {
  // model square is the centered square crop of the frame
  const side = Math.min(frameW, frameH)
  const s1 = side / YOLO_MODEL_INPUT_SIZE.width
  const ox = (frameW - side) / 2
  const oy = (frameH - side) / 2

  // preview is the frame cover-fitted into the view
  const s2 = Math.max(viewW / frameW, viewH / frameH)
  const px = (viewW - frameW * s2) / 2
  const py = (viewH - frameH * s2) / 2

  const toX = (x: number) => (x * s1 + ox) * s2 + px
  const toY = (y: number) => (y * s1 + oy) * s2 + py

  return {
    left: toX(b.xmin),
    top: toY(b.ymin),
    width: (b.xmax - b.xmin) * s1 * s2,
    height: (b.ymax - b.ymin) * s1 * s2,
  }
}

function Failure({ error }: { error: string }) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>{error}</Text>
        </View>
    )
}