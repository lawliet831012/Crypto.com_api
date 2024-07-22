'use client';
import {
  // orderbookThunks,
  sendMessage,
  subscriptionSlice,
} from '@/lib/redux';
import type { ReduxThunkAction } from '@/lib/redux';
import { orderbookDepth } from '@/config/symbols';
import type { supportedPeriod, supportedSymbol } from '@/config/symbols';

let orderBookTimeout: number | null = null;

// const updateOrderBookByInterval =
//   (): ReduxThunkAction => (dispatch, getState) => {
//     orderBookTimeout = window.setTimeout(() => {
//       dispatch(orderbookThunks.updateOrderBook());
//       dispatch(updateOrderBookByInterval());
//     }, 500);
//   };

export const subscribeOrderBook =
  ({ symbols, inherit }: subscribeOrderBookPayload): ReduxThunkAction =>
  (dispatch, getState) => {
    const { orderBookSubscribeList } = getState().subscription;
    if (orderBookTimeout !== null) {
      clearTimeout(orderBookTimeout);
      orderBookTimeout = null;
    }
    if (inherit) {
      symbols = Array.from(new Set([...orderBookSubscribeList, ...symbols])); // Remove duplicate symbols
    }
    const channels = symbols.map(
      (symbol) => `book.${symbol}.${orderbookDepth}`,
    );

    sendMessage('CRYPTO_COM_MARKET_WSS', {
      id: 1,
      method: 'subscribe',
      params: {
        channels,
      },
    });

    // dispatch(orderbookThunks.updateOrderBook());
    // dispatch(updateOrderBookByInterval());
    dispatch(subscriptionSlice.actions.setOrderBookSubscribeList(symbols));
  };

export const subscribeChart =
  (symbol: supportedSymbol, period: supportedPeriod): ReduxThunkAction =>
  (dispatch, getState) => {
    const { chartSubscrbe } = getState().subscription;
    if (chartSubscrbe !== undefined) {
      sendMessage('CRYPTO_COM_MARKET_WSS', {
        id: 1,
        method: 'unsubscribe',
        params: {
          channels: [chartSubscrbe],
        },
      });
    }
    const newSubscrbe = `candlestick.${period}.${symbol}`;
    sendMessage('CRYPTO_COM_MARKET_WSS', {
      id: 1,
      method: 'subscribe',
      params: {
        channels: [newSubscrbe],
      },
    });

    dispatch(subscriptionSlice.actions.setChartSubscrbe(newSubscrbe));
  };

export type subscribeOrderBookPayload = {
  symbols: supportedSymbol[];
  inherit: boolean;
};
