import { useObjectDetector, CocoClassYolo } from 'react-native-executorch';


export type YoloDetector = ReturnType<typeof useObjectDetector<'xyxy', CocoClassYolo>>;
