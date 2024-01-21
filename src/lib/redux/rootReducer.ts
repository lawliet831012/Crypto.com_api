/* Instruments */
import {
  coreSlice,
  websocketSlice,
  subscriptionSlice,
  orderbookSlice,
  chartSlice,
} from './slices';

export const reducer = {
  core: coreSlice.reducer,
  websocket: websocketSlice.reducer,
  subscription: subscriptionSlice.reducer,
  orderbook: orderbookSlice.reducer,
  chart: chartSlice.reducer,
};
