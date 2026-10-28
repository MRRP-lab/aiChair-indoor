import { createContext } from "react";
import { Connection } from "../connection";
import { BleManager } from "react-native-ble-plx";

export default createContext<
  | {
      connection: Connection | undefined;
      setConnection: (c: Connection) => void;
      bleManager: BleManager;
    }
  | undefined
>(undefined);
