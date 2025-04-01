import { getHeaderTitle, Header } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";

type HomeHeaderOptions = NativeStackHeaderProps;

export const HomeHeader = ({
  route,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
  options,
  back,
}: HomeHeaderOptions) => {
  return (
    <Header
      back={back}
      headerShadowVisible={options.headerShadowVisible}
      headerTitleAlign={options.headerTitleAlign}
      headerStyle={options.headerStyle}
      headerTitleStyle={options.headerTitleStyle}
      title={getHeaderTitle(options, route.name)}
    />
  );
};
