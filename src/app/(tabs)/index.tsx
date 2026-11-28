import { NavigationContainer } from "@react-navigation/native";
import MainNavigationStack from "./main-navigation-stack";
import { Connection, ConnectionManagerContext } from "../../bluetooth";
import { BleManager } from "react-native-ble-plx";
import { useState } from "react";
import CameraTracker from "./guide-following";
import GuideFollowing from "./guide-following";

export default function Index() {
  return <GuideFollowing />
}
