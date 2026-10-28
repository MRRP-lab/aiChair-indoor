import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Scanning } from "../bluetooth/";
import ConnectedStack from "./connected-stack";

export default function MainNavigationStack() {
  const navigate = createNativeStackNavigator();

  return (
    <navigate.Navigator>
      <navigate.Screen name="connect" component={Scanning} />
      <navigate.Screen name="connected" component={ConnectedStack} />
    </navigate.Navigator>
  );
}
