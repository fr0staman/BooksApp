import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Banner, OnError, OnLoading } from "@/components";
import { useAppSelector } from "@/state/store";

import { HomeBookList } from "./HomeBookList";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const { jsonData, loading, isError } = useAppSelector(
    state => state.remoteConfig,
  );

  if (loading) {
    return <OnLoading />;
  }

  if (!jsonData || isError) {
    return <OnError />;
  }

  return (
    <ScrollView
      style={{ marginBottom: insets.bottom }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.bannerContainer}>
        <Banner data={jsonData.top_banner_slides} />
      </View>
      <View>
        <HomeBookList data={jsonData} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginBottom: 40,
  },
  container: {
    marginHorizontal: 16,
    paddingVertical: 20,
  },
});

export default HomeScreen;
