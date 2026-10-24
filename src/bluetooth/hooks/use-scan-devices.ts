import { Result, Ok, Err } from "@trylonai/ts-result";
import { useContext, useEffect, useState } from "react";
import { Device, BleError, BleManager } from "react-native-ble-plx";
import { SERVICE_UUID } from "../uuids";
import connectionManagerContext from "../contexts/connection-manager-context";

export default function useScanDevices(): Result<Device[], BleError | null> {
  const ctx = useContext(connectionManagerContext);
  if (ctx === undefined) {
    throw new Error(
      "useScanDevices must be used within a ConnectionManagerContext.Provider",
    );
  }

  const { bleManager } = ctx;
  const [scanResult, setScanResult] = useState<
    Result<Device[], BleError | null>
  >(Ok([]));

  useEffect(() => {
    bleManager
      .startDeviceScan([SERVICE_UUID], null, (err, device) => {
        if (err) {
          setScanResult(Err(err));
        } else if (device) {
          setScanResult((result) =>
            result.map((devices) => [...devices, device]),
          );
        }
      })
      .catch(() => setScanResult(Err(null)));
    return () => void bleManager.stopDeviceScan();
  }, [bleManager]);

  return scanResult;
}
