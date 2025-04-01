import { HeaderBackButtonProps } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableHighlight, View } from "react-native";

export const CustomArrowBack = (_props: HeaderBackButtonProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.goBack()}
        underlayColor="transparent"
      >
        <Image
          style={styles.image}
          source={require("@/assets/images/arrow-back.png")}
        />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
  },
  image: {
    height: 13.5,
    width: 21,
  },
  touchable: {
    // Increate touchable box
    padding: 8,
    paddingLeft: 0,
  },
});
