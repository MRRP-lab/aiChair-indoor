import { Characteristic, Device } from "react-native-ble-plx";
import { COMMAND_UUID, SERVICE_UUID } from "./uuids";

export async function connect(device: Device): Promise<Connection> {
  await device.connect();
  await device.discoverAllServicesAndCharacteristics();

  return new Connection(device);
}

export class Connection {
  device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  sendToChair(value: string): Promise<Characteristic> {
    return this.device.writeCharacteristicWithResponseForService(
      SERVICE_UUID,
      COMMAND_UUID,
      btoa(value),
    );
  }
}
