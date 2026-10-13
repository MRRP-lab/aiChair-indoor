import React from 'react';
import { Button } from 'react-native';

export default function EmergencyStop(
    { sendToChair }: { sendToChair: (message: string) => void }
) {
  const handleEmergencyStop = () => {
    sendToChair('emergency-stop');
  };

  return (
    <Button
      title="Emergency Stop"
      onPress={handleEmergencyStop}
      color="red"
      accessibilityLabel="Emergency Stop Button"
    />
  );
}