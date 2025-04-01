import React, { useEffect, useState } from "react";
import { Image, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components";
import { useAppSelector } from "@/state/store";

import { DetailsBook } from "./DetailsBook";
import { DetailsMainCarousel } from "./DetailsMainCarousel";

type PageOptions = {
  route: {
    params: { bookId: number };
  };
};

export const DetailsScreen = ({ route }: PageOptions) => {
  const insets = useSafeAreaInsets();
  const [bookId, setBookId] = useState(route.params.bookId);
  const remoteConfig = useAppSelector(state => state.remoteConfig);

  useEffect(() => {
    setBookId(route.params.bookId);
  }, [route.params.bookId]);

  function onCarouselIndexChange(index: number) {
    setBookId(remoteConfig.detailsCarousel?.books[index].id || 0);
  }

  if (
    !remoteConfig.detailsCarousel ||
    !remoteConfig.jsonData ||
    remoteConfig.loading
  ) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={[styles.detailsContainer, { marginBottom: insets.bottom }]}>
      <StatusBar translucent hidden={false} backgroundColor="transparent" />
      <View>
        <View style={styles.cover}>
          <Image
            style={styles.coverImage}
            resizeMode="cover"
            source={require("@/assets/images/details-back.png")}
          />
        </View>
        <View style={styles.mainCarouselContainer}>
          <DetailsMainCarousel
            detailsCarousel={remoteConfig.detailsCarousel}
            jsonData={remoteConfig.jsonData}
            chosen={bookId}
            onIndexChange={onCarouselIndexChange}
          />
        </View>
      </View>
      <DetailsBook
        detailsCarousel={remoteConfig.detailsCarousel}
        jsonData={remoteConfig.jsonData}
        chosen={bookId}
        onIndexChange={onCarouselIndexChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  coverImage: {
    height: "100%",
    width: "100%",
  },
  detailsContainer: {
    flex: 1,
  },
  mainCarouselContainer: {
    marginBottom: 32,
    marginTop: 16,
  },
});
