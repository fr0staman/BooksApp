import React from "react";
import { StyleSheet } from "react-native";
import ReanimatedCarousel from "react-native-reanimated-carousel";

import { BookCarouselItem } from "@/components";
import { PAGE_WIDTH } from "@/constants/dimensions";
import { Book } from "@/types";

type CarouselProps = {
  data: Book[];
  itemLabelStyle?: Record<string, string>;
};

export const BookCarousel = ({ data, itemLabelStyle }: CarouselProps) => {
  return (
    <ReanimatedCarousel
      loop={false}
      overscrollEnabled={false}
      height={190}
      width={136}
      snapEnabled={true}
      pagingEnabled={true}
      data={data}
      style={styles.carousel}
      //onSnapToItem={index => console.log("current index:", index)}
      renderItem={({ index, item, animationValue }) => (
        <BookCarouselItem
          index={index}
          isLast={data.length === index + 1}
          item={item}
          animationValue={animationValue}
          labelStyle={itemLabelStyle}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  carousel: {
    marginLeft: -16,
    width: PAGE_WIDTH,
  },
});
