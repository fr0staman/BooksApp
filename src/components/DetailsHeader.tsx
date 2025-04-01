import { getHeaderTitle, Header } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";

import { CustomArrowBack } from "./CustomArrowBack";

type DetailsHeaderOptions = NativeStackHeaderProps;

export const DetailsHeader = ({
  route,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
  options,
  back,
}: DetailsHeaderOptions) => {
  return (
    <Header
      back={back}
      headerLeft={CustomArrowBack}
      headerShadowVisible={options.headerShadowVisible}
      headerStyle={options.headerStyle}
      headerTitleStyle={options.headerTitleStyle}
      title={getHeaderTitle(options, route.name)}
    />
  );
};
