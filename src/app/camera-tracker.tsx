import React, { useEffect } from 'react'
import { Camera, useCameraPermission, useDepthOutput } from 'react-native-vision-camera'

export default function CameraTracker() {
  const { hasPermission, requestPermission } = useCameraPermission()
  useEffect(() => {
    if (!hasPermission) requestPermission()
  }, [hasPermission, requestPermission])


  const depthOutput = useDepthOutput({
    onDepth(depth) {
      'worklet'
      console.log(`Received ${depth.width}x${depth.height} Depth!`)
      depth.dispose()
    }
  })
  
  return (
    <Camera
      style={{ flex: 1 }}
      isActive={true}
      device="back"
      outputs={[depthOutput]}
    />
  )
}