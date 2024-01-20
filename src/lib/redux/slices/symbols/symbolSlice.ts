import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SymbolState = {
  subscribedSymbols: string[];
};

const initialState: SymbolState = {
  subscribedSymbols: [],
};

export const symbolSlice = createSlice({
  name: 'symbol',
  initialState,
  reducers: {
    subscribeSymbol: (state, action: PayloadAction<string>) => {
      state.subscribedSymbols.push(action.payload);
    },
    unsubscribeSymbol: (state, action: PayloadAction<string>) => {
      state.subscribedSymbols = state.subscribedSymbols.filter(
        (symbol) => symbol !== action.payload,
      );
    },
  },
});
