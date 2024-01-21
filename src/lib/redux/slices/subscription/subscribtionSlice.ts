import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { supportedSymbol } from '@/config/symbols';

const initialState: SubscriptionState = {
  orderBookSubscribeList: [],
  chartSubscrbe: undefined,
};

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setOrderBookSubscribeList(state, action: PayloadAction<supportedSymbol[]>) {
      state.orderBookSubscribeList = action.payload;
    },
    setChartSubscrbe(state, action: PayloadAction<string>) {
      state.chartSubscrbe = action.payload;
    },
  },
});

export type SubscriptionState = {
  orderBookSubscribeList: supportedSymbol[];
  chartSubscrbe?: string;
};
