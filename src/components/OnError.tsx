import React from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "@/components";
import { COLORS } from "@/constants/colors";

export const OnError = () => {
  return (
    <View style={styles.container}>
      <Text variant="displayLarge" style={styles.error}>
        Error!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  error: {
    color: COLORS.accent,
  },
});
