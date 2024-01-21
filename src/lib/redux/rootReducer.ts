/* Instruments */
import { coreSlice, websocketSlice, quoteSlice, symbolSlice } from './slices';

export const reducer = {
  core: coreSlice.reducer,
  websocket: websocketSlice.reducer,
  quote: quoteSlice.reducer,
  symbol: symbolSlice.reducer,
};
