import { useObjectDetector, CocoClassYolo, models } from 'react-native-executorch';

export type YoloDetector = ReturnType<typeof useObjectDetector<'xyxy', CocoClassYolo>>;

export const YOLO_MODEL_INPUT_SIZE = { width: 384, height: 384 };
export const YOLO_MODEL = models.objectDetection.YOLO26.NANO.SIZE_384.DEFAULT;
