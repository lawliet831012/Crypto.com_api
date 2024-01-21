import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type supportedSymbol, symbolList } from '@/config/symbols';

const initialState: OrderbookState = symbolList.reduce((acc, symbol) => {
  acc[symbol] = {
    name: symbol,
    orderbook: {
      asks: [],
      bids: [],
    },
  };
  return acc;
}, {} as OrderbookState);

export const orderbookSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    updateOrderBook: (
      state,
      action: PayloadAction<{ symbol: supportedSymbol; data: OrderbookData }>,
    ) => {
      const { symbol, data } = action.payload;
      state[symbol].orderbook = data;
    },
  },
});

export type OrderbookState = Record<supportedSymbol, SymbolDetail>;

export type SymbolDetail = {
  name: supportedSymbol;
  orderbook: OrderbookData;
};

export type OrderbookData = {
  bids: Array<[number?, number?, number?]>;
  asks: Array<[number?, number?, number?]>;
};
