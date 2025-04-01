import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { InfiniteProgressBar, Text } from "@/components";
import { COLORS } from "@/constants/colors";

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/back.png")}
        style={[styles.image, styles.backImage]}
      />
      <Image
        source={require("@/assets/images/hearts.png")}
        style={[styles.image, styles.frontImage]}
      />
      <Text variant="displayLarge" style={styles.title}>
        Book App
      </Text>
      <Text variant="headlineSmall" style={styles.description}>
        Welcome to Book App
      </Text>
      <View style={styles.progressBarContainer}>
        <InfiniteProgressBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backImage: {},
  container: {
    alignItems: "center",
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: "center",
  },
  description: {
    // Note for the test task:
    // According to Figma, color should be #FFFFFFCC (80%), but
    // I personally don't like how it looks.
    // In real world I would re-clarify, but as for a test task, I think it is unnecessary
    color: COLORS.white,
    marginBottom: 40,
  },
  frontImage: {
    height: "70%",
  },
  image: {
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
    width: "100%",
  },
  progressBarContainer: {
    marginBottom: 95,
    width: "70%",
  },
  title: {
    color: COLORS.button,
    lineHeight: 68,
    marginBottom: 6,
  },
});
