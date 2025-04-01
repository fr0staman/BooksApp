import React from "react";
import { StyleSheet, View } from "react-native";

import { COLORS } from "@/constants/colors";

export const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: COLORS.disabledText,
    borderBottomWidth: 1,
  },
});
