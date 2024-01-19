/* Instruments */
import { counterSlice, websocketSlice } from './slices';

export const reducer = {
  counter: counterSlice.reducer,
  websocket: websocketSlice.reducer,
};
