import React from "react";
import { StyleSheet, View } from "react-native";

import { InfiniteProgressBar } from "@/components";

export const OnLoading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.insideContainer}>
        <InfiniteProgressBar />
      </View>
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
  insideContainer: {
    marginBottom: 54,
    width: "70%",
  },
});
