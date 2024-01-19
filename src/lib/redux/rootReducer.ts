/* Instruments */
import { coreSlice, counterSlice, websocketSlice } from './slices';

export const reducer = {
  core: coreSlice.reducer,
  counter: counterSlice.reducer,
  websocket: websocketSlice.reducer,
};
