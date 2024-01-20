import { sendMessage, quoteSlice } from '@/lib/redux';
import type { ReduxThunkAction } from '@/lib/redux';
import { orderbookDepth, type supportedSymbol } from '@/config/symbols';

export const subscribeOrderBook =
  ({ symbols, inherit }: subscribeOrderBookPayload): ReduxThunkAction =>
  (dispatch, getState) => {
    const { orderBookSubscribeList } = getState().quote;
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

    dispatch(quoteSlice.actions.setOrderBookSubscribeList(symbols));
  };

export const subscribeQuote =
  (symbol: supportedSymbol): ReduxThunkAction =>
  (dispatch, getState) => {
    sendMessage('CRYPTO_COM_MARKET_WSS', {
      id: 1,
      method: 'subscribe',
      params: {
        channels: [`ticker.${symbol}`],
      },
      nonce: Date.now(),
    });

    dispatch(quoteSlice.actions.setQuoteSubscribe(symbol));
  };

export type subscribeOrderBookPayload = {
  symbols: supportedSymbol[];
  inherit: boolean;
};
