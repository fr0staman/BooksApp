import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { BookCarousel, Text } from "@/components";
import { COLORS } from "@/constants/colors";
import { Book, JsonData } from "@/types";

type Options = {
  data: JsonData;
};

type Result = {
  label: string;
  data: Book[];
};

function splitValues(data: JsonData): Result[] {
  const result: Result[] = [];

  for (const item of data.books) {
    let pushed = false;
    result.forEach((v, i) => {
      if (v.label === item.genre) {
        pushed = true;
        result[i].data.push(item);
      }
    });

    if (!pushed) {
      result.push({
        label: item.genre,
        data: [item],
      });
    }
  }

  return result;
}

export const HomeBookList = ({ data }: Options) => {
  const value = useMemo(() => splitValues(data), [data]);

  return (
    <>
      {value.map((v, i) => (
        <View key={`book${i}`} style={styles.list}>
          <Text variant="titleLarge" style={styles.topLabel}>
            {v.label}
          </Text>
          <BookCarousel data={v.data} />
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: 24,
  },
  topLabel: {
    color: COLORS.white,
    // Maybe, letterSpacing should be as standard title, but in Figma letterSpacing is 0.
    letterSpacing: 0,
    marginBottom: 16,
  },
});
