import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";

import { BookCarousel, Divider, Text } from "@/components";
import { COLORS } from "@/constants/colors";
import { DetailsCarousel, JsonData } from "@/types";

type ChosenId = {
  chosen: number;
  onIndexChange: (index: number) => void;
  detailsCarousel: DetailsCarousel;
  jsonData: JsonData;
};

export const DetailsBook = ({
  chosen,
  detailsCarousel,
  jsonData,
}: ChosenId) => {
  const bookIndex = detailsCarousel.books.findIndex(item => item.id === chosen);
  const book = detailsCarousel.books[bookIndex];

  function onButtonPress() {
    Alert.alert(
      "Congratulations!",
      `You are a chosen one with ID ${book.id} "${book.name}" and found a Easter Egg!`,
    );
  }

  // Note for the test task:
  // Make numbers list generable with readers, likes, quotes, genre is
  // not a good idea for production, overengineering is not good either
  return (
    <View style={styles.detailsBanner}>
      <View style={styles.numbersWrapper}>
        <View style={styles.numbersContainer}>
          <Text variant="titleSmall" style={styles.numbers}>
            {book.views}
          </Text>
          <Text variant="bodySmall" style={styles.description}>
            Readers
          </Text>
        </View>
        <View style={styles.numbersContainer}>
          <Text variant="titleSmall" style={styles.numbers}>
            {book.likes}
          </Text>
          <Text variant="bodySmall" style={styles.description}>
            Likes
          </Text>
        </View>
        <View style={styles.numbersContainer}>
          <Text variant="titleSmall" style={styles.numbers}>
            {book.quotes}
          </Text>
          <Text variant="bodySmall" style={styles.description}>
            Quotes
          </Text>
        </View>
        <View style={styles.numbersContainer}>
          <Text variant="titleSmall" style={styles.numbers}>
            {book.genre}
          </Text>
          <Text variant="bodySmall" style={styles.description}>
            Genre
          </Text>
        </View>
      </View>
      <View style={[styles.onDivider, styles.firstDivider]}>
        <Divider />
      </View>
      <ScrollView
        //style={{ minHeight: 100 }}
        contentContainerStyle={styles.scrollableContainer}
      >
        <View style={styles.summaryContainer}>
          <Text variant="titleLarge" style={styles.summaryLabel}>
            Summary
          </Text>
          <Text variant="bodyMedium" style={styles.summary}>
            {book.summary}
          </Text>
        </View>
        <View style={styles.onDivider}>
          <Divider />
        </View>
        <View style={styles.alsoLikeContainer}>
          <Text
            variant="titleLarge"
            style={[styles.summaryLabel, styles.alsoLikeLabel]}
          >
            You will also like
          </Text>
          <BookCarousel
            data={detailsCarousel.books.filter(item =>
              jsonData.you_will_like_section.includes(item.id),
            )}
            itemLabelStyle={styles.alsoLikeCarouselLabel}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={onButtonPress}
            underlayColor={"transparent"}
          >
            <View style={styles.button}>
              <Text variant="labelLarge" style={styles.buttonLabel}>
                Read Now
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  alsoLikeCarouselLabel: {
    color: COLORS.mainText2,
  },
  alsoLikeContainer: {
    marginTop: 16,
  },
  alsoLikeLabel: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: COLORS.button,
    borderRadius: 256,
  },
  buttonContainer: {
    marginHorizontal: 52,
    marginVertical: 42,
  },
  buttonLabel: {
    alignSelf: "center",
    color: COLORS.white,
    marginVertical: 16,
  },
  description: {
    color: COLORS.disabledText,
  },
  detailsBanner: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    flex: 1,
    marginTop: -22,
  },
  firstDivider: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  numbers: {
    color: COLORS.mainText,
    // Note for the test task:
    // When on container we set justifyContent: "space-between" we have a problem with calculating gap
    // because numbers, values are changing and don't have identical width.
    // UI hack - just make element like 0 px with big negative margin.
    // UI not shifting? Yes, but may some inaccurates with big text.
    marginHorizontal: -64,
  },
  numbersContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  numbersWrapper: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 36,
    marginTop: 20,
  },
  onDivider: {
    marginTop: 8,
  },
  scrollableContainer: {
    flexGrow: 1,
    marginHorizontal: 16,
  },
  summary: {
    color: COLORS.mainText2,
    marginTop: 8,
  },
  summaryContainer: {
    marginBottom: 8,
    marginTop: 16,
  },
  summaryLabel: {
    color: COLORS.mainText,
  },
});
