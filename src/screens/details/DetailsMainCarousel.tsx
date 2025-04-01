import React, { useEffect } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import ReanimatedCarousel, {
  CarouselRenderItem,
  ICarouselInstance,
} from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components";
import { COLORS } from "@/constants/colors";
import { PAGE_HEIGHT, PAGE_WIDTH } from "@/constants/dimensions";
import { BORDER_RADIUS } from "@/constants/ui";
import { Book, DetailsCarousel, JsonData } from "@/types";

type ChosenId = {
  chosen: number;
  onIndexChange: (index: number) => void;
  detailsCarousel: DetailsCarousel;
  jsonData: JsonData;
};

export const DetailsMainCarousel = ({
  chosen,
  onIndexChange,
  detailsCarousel,
}: ChosenId) => {
  const insets = useSafeAreaInsets();

  const progress = useSharedValue<number>(0);
  const ref = React.useRef<ICarouselInstance>(null);

  useEffect(() => {
    const currentIndex = ref.current?.getCurrentIndex();
    const findedIndex =
      detailsCarousel.books.findIndex(item => item.id === chosen) || 0;

    if (findedIndex !== currentIndex) {
      scrollOnChosenChange(findedIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosen]);

  function scrollOnChosenChange(index: number) {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  }

  const platformMargin = Platform.OS === "ios" ? 8 : 16;
  const marginTop = insets.top + platformMargin;

  return (
    <ReanimatedCarousel
      ref={ref}
      loop={false}
      width={PAGE_WIDTH}
      height={PAGE_HEIGHT / 2.88}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: PAGE_WIDTH / 1.8,
        parallaxAdjacentItemScale: 0.7,
      }}
      defaultIndex={detailsCarousel.books.findIndex(item => item.id === chosen)}
      onProgressChange={progress}
      onSnapToItem={onIndexChange}
      style={[styles.mainCarousel, { marginTop }]}
      data={detailsCarousel?.books}
      renderItem={SlideItem}
    />
  );
};

export const SlideItem = (props: Parameters<CarouselRenderItem<Book>>[0]) => {
  const { item, ...animatedViewProps } = props;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedViewProps.animationValue.value,
        [-1, 0, 1],
        [0, 1, 0],
      ),
    };
  });

  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.container}
        source={{ uri: item?.cover_url }}
        resizeMode="cover"
      />
      <Animated.View style={[styles.textContainer, animatedStyle]}>
        <Text variant="titleLarge" numberOfLines={2} style={styles.bookName}>
          {item?.name}
        </Text>
        <Text variant="labelMedium" numberOfLines={2} style={styles.author}>
          {item?.author}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  author: {
    color: COLORS.textSlightTransparent2,
    marginTop: 4,
  },
  bookName: {
    color: COLORS.white,
  },
  container: {
    borderRadius: BORDER_RADIUS,
    height: PAGE_HEIGHT / 3.5,
    width: PAGE_WIDTH / 1.95,
  },
  mainCarousel: {
    width: PAGE_WIDTH,
  },
  textContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 30,
  },
  wrapper: {
    alignItems: "center",
    height: "100%",
  },
});
