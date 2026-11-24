import { YoloDetector } from "@/src/vision/yolo";
import { View, Text } from "react-native";
import { ImageBuffer } from "react-native-executorch/cv";

export default function GuideTrackingScreen(detector: YoloDetector) {
    const handleDetect = async (imageBuffer: ImageBuffer) => {
        if (!detector.isReady || !detector.detectObjects) return;

        // Run inference on background thread
        const detections = await detector.detectObjects(imageBuffer, {
            confidenceThreshold: 0.5,
            iouThreshold: 0.55,
        });
        console.log('Detected objects:', detections);
    };

    return (
        <View>
            <Text>Camera detection</Text>
        </View>
    );
}

function handleDetect(imageBuffer: ImageBuffer) {}