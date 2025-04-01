import "react-native-gesture-handler";

import React from "react";
import { Provider } from "react-redux";

import { AppContent } from "@/AppContent";
import { store } from "@/state/store";

export const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};
