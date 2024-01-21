import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type supportedSymbol, symbolList } from '@/config/symbols';

const initialState: SymbolState = symbolList.reduce((acc, symbol) => {
  acc[symbol] = {
    name: symbol,
    orderbook: {
      asks: [],
      bids: [],
    },
    quote: {
      ticker: {
        h: null,
        l: null,
        a: null,
        c: null,
        b: null,
        bs: null,
        k: null,
        ks: null,
        i: symbol,
        v: '0',
        vv: '0',
        oi: '0',
        t: 0,
      },
      candleStick: [],
    },
  };
  return acc;
}, {} as SymbolState);

export const symbolSlice = createSlice({
  name: 'symbol',
  initialState,
  reducers: {
    updateTicker: (state, action: PayloadAction<Ticker>) => {
      const { i } = action.payload;
      state[i].quote.ticker = action.payload;
    },
    updateOrderBook: (
      state,
      action: PayloadAction<{ symbol: supportedSymbol; data: OrderbookData }>,
    ) => {
      const { symbol, data } = action.payload;
      state[symbol].orderbook = data;
    },
  },
});

export type SymbolState = Record<supportedSymbol, SymbolDetail>;

export type SymbolDetail = {
  name: supportedSymbol;
  orderbook: OrderbookData;
  quote: {
    ticker: Ticker;
    candleStick: CandleStickData[];
  };
};

export type OrderbookData = {
  bids: Array<[number?, number?, number?]>;
  asks: Array<[number?, number?, number?]>;
};

export type Ticker = {
  h: string | null; // Price of the 24h highest trade
  l: string | null; // Price of the 24h lowest trade, null if there weren't any trades
  a: string | null; // The price of the latest trade, null if there weren't any trades
  c: string | null; // 24-hour price change, null if there weren't any trades
  b: string | null; // The current best bid price, null if there aren't any bids
  bs: string | null; // The current best bid size, null if there aren't any bids
  k: string | null; // The current best ask price, null if there aren't any asks
  ks: string | null; // The current best ask size, null if there aren't any bids
  i: supportedSymbol; // Instrument name
  v: string; // The total 24h traded volume
  vv: string; // The total 24h traded volume value (in USD)
  oi: string; // Open interest
  t: number; // Timestamp
};

export type CandleStickData = {
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  c: string; // Close price
  v: string; // Volume
  t: number; // Start time
};
