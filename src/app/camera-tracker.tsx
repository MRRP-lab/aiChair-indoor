import React, { useEffect } from 'react'
import { models, useObjectDetector } from 'react-native-executorch'
import { Camera, useCameraPermission, useDepthOutput } from 'react-native-vision-camera'
import ModelLoadingScreen from './components/vision/model-loading-screen'
import GuideTrackingScreen from './components/vision/guide-tracking-screen'

export default function CameraTracker() {
  const { hasPermission, requestPermission } = useCameraPermission()
  useEffect(() => {
    if (!hasPermission) requestPermission()
  }, [hasPermission, requestPermission])

  const detector = useObjectDetector(models.objectDetection.YOLO26.NANO.DEFAULT);
  if (!detector.isReady) {
    return <ModelLoadingScreen progress={detector.downloadProgress}/>;
  } else {
    return <GuideTrackingScreen detector={detector}/>;
  }


  // const depthOutput = useDepthOutput({
  //   onDepth(depth) {
  //     'worklet'
  //     console.log(`Received ${depth.width}x${depth.height} Depth!`)
  //     depth.dispose()
  //   }
  // })
  
  return (
    <></>
    // <Camera
    //   style={{ flex: 1 }}
    //   isActive={true}
    //   device="back"
    //   outputs={[depthOutput]}
    // />
  )
}