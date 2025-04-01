import { createStaticNavigation, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DetailsHeader, HomeHeader, textStyles } from "@/components";
import { COLORS } from "@/constants/colors";
import { DetailsScreen } from "@/screens/details/DetailsScreen";
import HomeScreen from "@/screens/home/Home";

export const RootStack = createNativeStackNavigator({
  screenOptions: {
    contentStyle: {
      backgroundColor: COLORS.background,
    },
    headerShadowVisible: false,
    headerTitleAlign: "left",
    // Note for the test task:
    // If you have navigation bar and remove this line - you will get layout shift in DetailsScreen.
    navigationBarTranslucent: true,
    navigationBarColor: "transparent",
  },
  screens: {
    Main: {
      screen: HomeScreen,
      options: {
        header: HomeHeader,
        headerTitle: "Library",
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTitleStyle: {
          ...textStyles.titleLarge,
          ...{
            color: COLORS.accent,
          },
        },
        contentStyle: {
          backgroundColor: COLORS.background,
        },
        // Note for the test task:
        // statusBarHidden from react-navigation completely broken.
        // It leaves dark space on status bar previous.
        //statusBarHidden: true
        //statusBarTranslucent: true,
        //statusBarBackgroundColor: "transparent",
      },
    },
    Details: {
      screen: DetailsScreen,
      options: {
        header: DetailsHeader,
        headerTitle: "",
        headerStyle: {
          // react-navigation show warnings if you uncomment that
          // color: COLORS.white,
          backgroundColor: "transparent",
        },
        headerTransparent: true,
        contentStyle: {
          backgroundColor: COLORS.white,
        },
        navigationBarTranslucent: false,
        navigationBarColor: COLORS.white,
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.background,
  },
};
