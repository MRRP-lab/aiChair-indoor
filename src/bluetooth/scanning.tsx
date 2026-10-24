import { Device } from "react-native-ble-plx";
import { View, Text, Button } from "react-native";
import { useState } from "react";
import { connect } from "./connection";
import useScanDevices from "./hooks/use-scan-devices";
import useUpdateConnection from "./hooks/use-update-connection";

export default function Scanning() {
  const [failedToConnect, setFailedToConnect] = useState(false);
  const devices = useScanDevices();
  const setConnection = useUpdateConnection();

  const handleConnectBletooth = (device: Device) => () => {
    connect(device)
      .then(setConnection)
      .catch(() => setFailedToConnect(true));
  };

  function ConnectToDeviceButton(device: Device) {
    const name = device.name ?? "Unknown device";

    return (
      <Button
        title={name}
        accessibilityLabel={"connect to " + name}
        onPress={handleConnectBletooth(device)}
      ></Button>
    );
  }

  return (
    <View>
      {failedToConnect && <Text>Cannot connect to device</Text>}
      {devices.match({
        Ok: (devices) => <View>{devices.map(ConnectToDeviceButton)}</View>,
        Err: (error) => <Text>Failed to connect {error?.message}</Text>,
      })}
    </View>
  );
}
