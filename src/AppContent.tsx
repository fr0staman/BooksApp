import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import RNBootSplash from "react-native-bootsplash";
import Animated, { FadeOut } from "react-native-reanimated";

import { SplashScreen } from "@/components";
import { COLORS } from "@/constants/colors";
import { useAppDispatch } from "@/state/store";

import { Navigation, navigationTheme } from "./navigation/Navigator";
import { fetchRemoteConfig } from "./state/remoteConfigSlice";

export const AppContent = () => {
  const dispatch = useAppDispatch();

  const [fakeBootsplash, setFakeBootsplash] = useState(true);

  useEffect(() => {
    // In ideal world we should wait dispatch
    dispatch(fetchRemoteConfig());
    RNBootSplash.hide({ fade: true });
    setTimeout(() => {
      setFakeBootsplash(false);
      // Note for the test task:
      // Due to broken react-navigation statusBarHidden, we need to set by self
      //StatusBar.setHidden(true);
    }, 2000);
  }, [dispatch]);

  // Note for the test task:
  // Navigator behind the background of an fake bootsplash on absolute does not interfere with the rendering of the navigation and possible processes under it.
  // That's why something like "return fakeBootsplash ? <Bootsplash /> : <Navigator />" was not written
  // In general, it would be a good idea to listen to Navigator onReady and other requests, but it says to wait 2 seconds - so we wait :)
  return (
    <>
      <StatusBar translucent hidden backgroundColor="transparent" />
      {fakeBootsplash && (
        <Animated.View exiting={FadeOut} style={styles.bootsplashContainer}>
          <SplashScreen />
        </Animated.View>
      )}
      <Navigation theme={navigationTheme} />
    </>
  );
};

const styles = StyleSheet.create({
  bootsplashContainer: {
    backgroundColor: COLORS.background,
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 3,
  },
});
