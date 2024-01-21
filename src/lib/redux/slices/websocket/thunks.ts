/* Instruments */
import { sendMessage, symbolSlice } from '@/lib/redux';
import type {
  ReduxThunkAction,
  messageType,
  Ticker,
  OrderbookData,
} from '@/lib/redux';
import type { supportedSymbol } from '@/config/symbols';

export const messageParser: Record<
  string,
  (name: string, message: messageType) => ReduxThunkAction
> = {
  'public/heartbeat': (name, messge) => (dispatch, getState) => {
    const { id } = messge;
    sendMessage(name, { id, method: 'public/respond-heartbeat' });
  },
  subscribe: (name, messge) => (dispatch, getState) => {
    const { result = {} } = messge;
    const { channel, data, instrument_name: instrumentName } = result;
    if (channel in subscribeParser) {
      dispatch(subscribeParser[channel](instrumentName, data[0]));
    }
  },
};

export const subscribeParser: Record<
  string,
  (symbol: supportedSymbol, data: Ticker | OrderbookData) => ReduxThunkAction
> = {
  book: (symbol, data) => (dispatch, getState) => {
    dispatch(
      symbolSlice.actions.updateOrderBook({
        symbol,
        data: data as OrderbookData,
      }),
    );
  },
  ticker: (symbol, data) => (dispatch, getState) => {
    dispatch(symbolSlice.actions.updateTicker(data as Ticker));
  },
};
