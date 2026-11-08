import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Scanning } from "../bluetooth/";
import ConnectedStack from "./connected-stack";

export type MainStackParamList = {
  scanning: undefined;
  connected: undefined;
};

export default function MainNavigationStack() {
  const navigate = createNativeStackNavigator<MainStackParamList>();

  return (
    <navigate.Navigator>
      <navigate.Screen name="scanning" component={Scanning} />
      <navigate.Screen name="connected" component={ConnectedStack} />
    </navigate.Navigator>
  );
}
