import { NavigationContainer } from "@react-navigation/native";
import MainNavigationStack from "./main-navigation-stack";
import { Connection, ConnectionManagerContext } from "../bluetooth/";
import { BleManager } from "react-native-ble-plx";
import { useState } from "react";
import CameraTracker from "./camera-tracker";

export default function Index() {

  return (
    <CameraTracker></CameraTracker>
  );
}
