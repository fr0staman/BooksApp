/* eslint-disable react-native/no-unused-styles */
import React from "react";
import {
  Platform,
  StyleSheet,
  Text as NativeText,
  TextProps,
} from "react-native";

type CustomTextProps = TextProps & {
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  variant?:
    | "bodySmall"
    | "bodyMedium"
    | "bodyLarge"
    | "labelMedium"
    | "labelLarge"
    | "titleLarge"
    | "titleSmall"
    | "headlineSmall"
    | "displayLarge";
};

const fontFamily = {
  100: "NunitoSans-Thin",
  200: "NunitoSans-ExtraLight",
  300: "NunitoSans-Light",
  400: "NunitoSans",
  500: "NunitoSans-Medium",
  600: "NunitoSans-SemiBold",
  700: "NunitoSans-Bold",
  800: "NunitoSans-ExtraBold",
  900: "NunitoSansExtraBlack-Regular",
};

export const Text = ({
  variant = "bodyMedium",
  fontWeight,
  style,
  numberOfLines,
  children,
}: CustomTextProps) => {
  const chosenFontFamily = fontWeight
    ? { fontFamily: fontFamily[fontWeight] }
    : undefined;
  const chosenVariant = textStyles[variant];

  return (
    <NativeText
      numberOfLines={numberOfLines}
      style={[chosenVariant, chosenFontFamily, style]}
    >
      {children}
    </NativeText>
  );
};

export const textStyles = StyleSheet.create({
  bodyLarge: {
    fontFamily: fontFamily[600],
    fontSize: 16,
    letterSpacing: -0.41,
    // According to Figma - line height is 110%
    lineHeight: 17.6,
  },
  bodyMedium: {
    fontFamily: fontFamily[600],
    fontSize: 14,
    letterSpacing: 0.15,
    lineHeight: 16.8,
  },
  bodySmall: {
    fontFamily: fontFamily[600],
    fontSize: 12,
    letterSpacing: -0.41,
    lineHeight: 13.2,
  },
  displayLarge: {
    fontFamily: "Georgia-BoldItalic",
    fontSize: 52,
    // Note for the test task:
    // IOS won't display this font on "italic" without this prop.
    // But on Android, if you set "italic", this will break font usage.
    fontStyle: Platform.OS === "ios" ? "italic" : "normal",
    letterSpacing: 0,
    lineHeight: 52,
  },
  headlineSmall: {
    fontFamily: fontFamily[700],
    fontSize: 24,
    letterSpacing: 0,
    lineHeight: 25.4,
  },
  labelLarge: {
    fontFamily: fontFamily[800],
    fontSize: 16,
    letterSpacing: 0,
  },
  labelMedium: {
    fontFamily: fontFamily[700],
    fontSize: 14,
    letterSpacing: -0.41,
    lineHeight: 15.4,
  },
  titleLarge: {
    fontFamily: fontFamily[700],
    fontSize: 20,
    letterSpacing: -0.41,
    lineHeight: 22,
  },
  titleSmall: {
    fontFamily: fontFamily[700],
    fontSize: 18,
    letterSpacing: -0.41,
    lineHeight: 22,
  },
});
