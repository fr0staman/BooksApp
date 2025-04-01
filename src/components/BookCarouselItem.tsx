import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  type ImageStyle,
  type StyleProp,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { CarouselRenderItem } from "react-native-reanimated-carousel";

import { LoadingImage, Text } from "@/components";
import { COLORS } from "@/constants/colors";
import { BORDER_RADIUS } from "@/constants/ui";
import { Book } from "@/types";

type Props = Parameters<CarouselRenderItem<Book>>[0] & {
  isLast: boolean;
  labelStyle?: Record<string, string>;
  style?: StyleProp<ImageStyle>;
};

export const BookCarouselItem: React.FC<Props> = ({
  style,
  isLast,
  item,
  index,
  labelStyle,
}: Props) => {
  const navigation = useNavigation();

  function onPress() {
    // @ts-expect-error Typing react-navigation is always a mess...
    navigation.navigate("Details", { bookId: item.id });
  }

  return (
    <TouchableHighlight onPress={onPress} underlayColor="transparent">
      <Animated.View
        style={[
          styles.wrapper,
          index === 0
            ? styles.firstElement
            : isLast
            ? styles.lastElement
            : styles.otherElement,
        ]}
      >
        <View style={styles.container}>
          <LoadingImage
            style={[style, styles.container]}
            source={{
              uri: item?.cover_url,
            }}
            resizeMode="cover"
          />

          <Text
            variant="bodyLarge"
            numberOfLines={2}
            style={[styles.overlayText, labelStyle]}
          >
            {item?.name}
          </Text>
        </View>
      </Animated.View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    height: 150,
    width: 120,
  },
  firstElement: {
    marginLeft: 16,
  },
  lastElement: {
    marginRight: 16,
  },
  otherElement: {
    marginLeft: 8,
    marginRight: 8,
  },
  overlayText: {
    color: COLORS.white,
    marginTop: 4,
  },
  wrapper: {
    height: "100%",
  },
});
