import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ConnectionContext,
  ConnectionManagerContext,
} from "../bluetooth/";
import EmergencyStop from "./emergency-stop";
import { useContext } from "react";

export default function ConnectedStack() {
  const navigate = createNativeStackNavigator();
  const ctx = useContext(ConnectionManagerContext);
  if (ctx === undefined) {
    throw new Error("ConnectedStack must be inside a ConnectionManagerContext.Provider");
  }

  return (
    <ConnectionContext.Provider value={ctx.connection}>
      <navigate.Navigator>
        <navigate.Screen name="stop button" component={EmergencyStop} />
      </navigate.Navigator>
    </ConnectionContext.Provider>
  );
}
