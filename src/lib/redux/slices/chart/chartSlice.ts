import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type supportedSymbol, symbolList } from '@/config/symbols';

const initialState: ChartState = {
  active: undefined,
  history: symbolList.reduce(
    (acc, symbol) => {
      acc[symbol] = {
        name: symbol,
        candlesStick: [],
      };
      return acc;
    },
    {} as Record<supportedSymbol, ChartDetail>,
  ),
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<supportedSymbol>) => {
      state.active = action.payload;
      state.history[action.payload].candlesStick = [];
    },
    updateHistory: (
      state,
      action: PayloadAction<{
        symbol: supportedSymbol;
        data: RawData[];
      }>,
    ) => {
      const { symbol, data } = action.payload;
      state.history[symbol].candlesStick = data;
    },
  },
});

export type ChartState = {
  active?: supportedSymbol;
  history: Record<supportedSymbol, ChartDetail>;
};

export type ChartDetail = {
  name: supportedSymbol;
  candlesStick: RawData[];
};

export type TradeData = {
  d: string; // Trade ID
  t: number; // Trade time
  p: string; // Price
  q: string; // Quantity
  s: string; // Side
  i: string; // Instrument name
};

export type RawData = {
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  c: string; // Close price
  v: string; // Volume
  t: number; // Start time
};

export type CandleStickData = {
  close: number;
  date: Date;
  high: number;
  low: number;
  open: number;
  volume: number;
};
