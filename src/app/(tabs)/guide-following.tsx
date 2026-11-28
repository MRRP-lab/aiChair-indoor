import { useEffect } from 'react'
import { useObjectDetector } from 'react-native-executorch'
import { useCameraPermission } from 'react-native-vision-camera'
import ModelLoadingScreen from '../components/vision/model-loading-screen'
import GuideTrackingScreen from '../components/vision/guide-tracking-screen'
import { YOLO_MODEL } from '@/src/vision/yolo'

export default function GuideFollowing() {
  const { hasPermission, requestPermission } = useCameraPermission()
  useEffect(() => {
    if (!hasPermission) requestPermission()
  }, [hasPermission, requestPermission])

  const detector = useObjectDetector(YOLO_MODEL);
  if (!detector.isReady) {
    return <ModelLoadingScreen progress={detector.downloadProgress}/>;
  } else {
    return <GuideTrackingScreen detector={detector}/>;
  }
}