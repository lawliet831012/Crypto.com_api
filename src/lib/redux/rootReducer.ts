/* Instruments */
import { coreSlice, counterSlice, websocketSlice, quoteSlice } from './slices';

export const reducer = {
  core: coreSlice.reducer,
  counter: counterSlice.reducer,
  websocket: websocketSlice.reducer,
  quote: quoteSlice.reducer,
};
