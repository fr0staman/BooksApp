import remoteConfig from "@react-native-firebase/remote-config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { DetailsCarousel, JsonData } from "@/types";

interface RemoteConfigState {
  loading: boolean;
  isError: boolean;
  jsonData?: JsonData;
  detailsCarousel?: DetailsCarousel;
}

const initialState: RemoteConfigState = {
  jsonData: undefined,
  detailsCarousel: undefined,
  loading: false,
  isError: false,
};

export const fetchRemoteConfig = createAsyncThunk(
  "remoteConfig/fetch",
  async () => {
    await remoteConfig().fetchAndActivate();
    return {
      jsonData: JSON.parse(remoteConfig().getString("json_data")),
      detailsCarousel: JSON.parse(remoteConfig().getString("details_carousel")),
    };
  },
);

const remoteConfigSlice = createSlice({
  name: "remoteConfig",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRemoteConfig.pending, state => {
        state.loading = true;
      })
      .addCase(fetchRemoteConfig.fulfilled, (state, action) => {
        state.jsonData = action.payload.jsonData;
        state.detailsCarousel = action.payload.detailsCarousel;
        state.loading = false;
      })
      .addCase(fetchRemoteConfig.rejected, state => {
        state.loading = false;
        state.isError = true;
      });
  },
});

export default remoteConfigSlice.reducer;
