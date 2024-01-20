import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { supportedSymbol } from '@/config/symbols';

const initialState: QuoteState = {
  orderBookSubscribeList: [],
  quoteSubscrbe: undefined,
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setOrderBookSubscribeList(state, action: PayloadAction<supportedSymbol[]>) {
      state.orderBookSubscribeList = action.payload;
    },
    setQuoteSubscribe(state, action: PayloadAction<string>) {
      state.quoteSubscrbe = action.payload;
    },
  },
});

export type QuoteState = {
  orderBookSubscribeList: supportedSymbol[];
  quoteSubscrbe?: string;
};
