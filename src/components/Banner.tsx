import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  type ImageStyle,
  type StyleProp,
  StyleSheet,
  TouchableHighlight,
  View,
  type ViewProps,
} from "react-native";
import type { AnimatedProps } from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import ReanimatedCarousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import { LoadingImage } from "@/components/LoadingImage";
import { COLORS } from "@/constants/colors";
import { PAGE_WIDTH } from "@/constants/dimensions";
import { BORDER_RADIUS } from "@/constants/ui";
import { TopBannerSlide } from "@/types";

interface Options {
  data: TopBannerSlide[];
}

export const Banner = ({ data }: Options) => {
  const progress = useSharedValue<number>(0);

  const ref = React.useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <>
      <ReanimatedCarousel
        ref={ref}
        loop={true}
        width={PAGE_WIDTH - 32}
        height={(PAGE_WIDTH - 32) / 2.14375}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlay={true}
        autoPlayInterval={3000}
        data={data}
        onProgressChange={progress}
        style={styles.banner}
        onConfigurePanGesture={g => {
          "worklet";
          g.enabled(false);
        }}
        renderItem={({ index, item }) => (
          <SlideItem key={index} index={index} item={item} />
        )}
      />
      <View style={styles.overlay}>
        <View style={styles.overlayTextContainer}>
          <Pagination.Basic
            progress={progress}
            data={data.map(_ => 1)}
            size={7}
            dotStyle={styles.paginationDot}
            activeDotStyle={styles.paginationDotActive}
            containerStyle={styles.paginationContainer}
            horizontal
            onPress={onPressPagination}
          />
        </View>
      </View>
    </>
  );
};

interface Props extends AnimatedProps<ViewProps> {
  item: TopBannerSlide;
  style?: StyleProp<ImageStyle>;
  index?: number;
}

export const SlideItem: React.FC<Props> = ({ style, item }) => {
  const navigation = useNavigation();

  function onPress() {
    // @ts-expect-error Typing react-navigation is always a mess...
    navigation.navigate("Details", { bookId: item.book_id });
  }

  return (
    <TouchableHighlight underlayColor="transparent" onPress={onPress}>
      <LoadingImage
        style={[style, styles.container]}
        source={{
          uri: item?.cover,
        }}
        resizeMode="cover"
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  banner: {
    borderRadius: BORDER_RADIUS,
    width: "100%",
  },
  container: {
    minHeight: "100%",
    width: "100%",
  },
  overlay: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "flex-end",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  overlayTextContainer: {
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    padding: 8,
  },
  paginationContainer: {
    gap: 10,
  },
  paginationDot: {
    backgroundColor: COLORS.dark300,
    borderRadius: 100,
  },
  paginationDotActive: {
    backgroundColor: COLORS.accent,
    borderRadius: 100,
    overflow: "hidden",
  },
});
