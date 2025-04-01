import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { COLORS } from "@/constants/colors";

export const InfiniteProgressBar = () => {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(100, { duration: 2000, easing: Easing.linear }),
      -1,
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={styles.progressBar}>
      <Animated.View style={[styles.progress, animatedStyle]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  progress: {
    backgroundColor: COLORS.white,
    height: "100%",
  },
  progressBar: {
    backgroundColor: COLORS.progressBarDisabled,
    borderRadius: 3,
    height: 6,
    overflow: "hidden",
    width: "100%",
  },
});
