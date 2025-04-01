import React, { useState } from "react";
import { ImageProps, StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { COLORS } from "@/constants/colors";

export const LoadingImage = (props: ImageProps) => {
  const [loading, setLoading] = useState<boolean | null>(true);

  return (
    <View
      style={[
        styles.imageContainer,
        loading === true && styles.placeholder,
        loading === null && styles.placeholderError,
      ]}
    >
      <Animated.Image
        source={props.source}
        style={props.style}
        resizeMode={props.resizeMode}
        entering={FadeIn.duration(500)}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 16,
  },
  placeholder: {
    backgroundColor: COLORS.notLoaded,
  },
  placeholderError: {
    backgroundColor: COLORS.purpleBackground,
  },
});
