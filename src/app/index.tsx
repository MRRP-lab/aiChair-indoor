import { NavigationContainer } from "@react-navigation/native";
import MainNavigationStack from "./main-navigation-stack";
import { Connection, ConnectionManagerContext } from "../bluetooth/";
import { BleManager } from "react-native-ble-plx";
import { useState } from "react";

export default function Index() {
  const bleManager = new BleManager();
  const [connection, setConnection] = useState<Connection | undefined>(
    undefined,
  );

  return (
    <NavigationContainer>
      <ConnectionManagerContext.Provider
        value={{ bleManager, connection, setConnection }}
      >
        <MainNavigationStack />
      </ConnectionManagerContext.Provider>
    </NavigationContainer>
  );
}
