/**
 * @format
 */

import { AppRegistry } from "react-native";

import { App } from "@/App";

import { name as appName } from "./app.json";

// @react-native-firebase/remote-config not ready yet to v22.
// https://rnfirebase.io/migrating-to-v22#switching-off-warning-logs
// eslint-disable-next-line no-undef
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

AppRegistry.registerComponent(appName, () => App);
