/* Instruments */
import {
  sendMessage,
  orderbookSlice,
  chartThunks,
  chartSlice,
} from '@/lib/redux';
import type {
  ReduxThunkAction,
  messageType,
  OrderbookData,
  RawData,
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
      dispatch(subscribeParser[channel](instrumentName, data));
    }
  },
};

export const subscribeParser: Record<
  string,
  (
    symbol: supportedSymbol,
    data: Array<OrderbookData | RawData>,
  ) => ReduxThunkAction
> = {
  book: (symbol, data) => (dispatch, getState) => {
    dispatch(
      orderbookSlice.actions.updateOrderBook({
        symbol,
        data: data[0] as OrderbookData,
      }),
    );
  },
  candlestick: (symbol, data) => (dispatch, getState) => {
    if (data.length === 1) {
      dispatch(chartThunks.updateBar(symbol, data[0] as RawData));
    } else {
      dispatch(
        chartSlice.actions.updateHistory({
          symbol,
          data: data as RawData[],
        }),
      );
    }
  },
};
