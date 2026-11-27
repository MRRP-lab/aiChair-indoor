import { YoloDetector } from "@/src/vision/yolo";
import { View, Text } from "react-native";
import { ImageBuffer } from "react-native-executorch/cv";
import { Camera, useCameraDevice, useFrameOutput } from 'react-native-vision-camera';

export default function GuideTrackingScreen({ detector }: { detector: YoloDetector }) {
    const device = useCameraDevice('back')

    const handleDetect = async (imageBuffer: ImageBuffer) => {
        if (!detector.isReady || !detector.detectObjects) return;

        // Run inference on background thread
        const detections = await detector.detectObjects(imageBuffer, {
            confidenceThreshold: 0.5,
            iouThreshold: 0.55,
        });
        console.log('Detected objects:', detections);
    };

    const frameOutput = useFrameOutput({
        // ...options
        onFrame(frame) {
            'worklet'
            console.log(`Received ${frame.width}x${frame.height} Frame!`)
            frame.dispose()
        }
    })

    return (
        <View>
            <Text>Camera detection</Text>
            <Camera
                style={{ flex: 1 }}
                isActive={true}
                device="back"
                outputs={[frameOutput]}
            />
        </View>
    );
}