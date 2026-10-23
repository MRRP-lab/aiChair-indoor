import {
  type BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";

const CHARACTARISTIC_UUID = "";
const SERVICE_UUID = "";

export async function scan(
  bleManager: BleManager,
  onDevice: (device: Device) => void,
  onErr: (err: BleError) => void,
) {
  bleManager.startDeviceScan([SERVICE_UUID], null, (err, device) => {
    if (err) {
      onErr(err);
    } else if (device) {
      onDevice(device);
    }
  });
}

export async function connect(device: Device): Promise<Connection> {
  await device.connect();
  await device.discoverAllServicesAndCharacteristics();

  return new Connection(device);
}

class Connection {
  device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  sendToChair(value: string): Promise<Characteristic> {
    return this.device.writeCharacteristicWithResponseForService(
      SERVICE_UUID,
      CHARACTARISTIC_UUID,
      btoa(value),
    );
  }
}

export type { Connection };
