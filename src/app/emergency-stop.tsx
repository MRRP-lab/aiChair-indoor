import React from "react";
import { Button } from "react-native";
import { useConnection } from "../bluetooth";

export default function EmergencyStop() {
  const connection = useConnection();
  const handleEmergencyStop = () => {
    connection.sendToChair("emergency-stop");
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
