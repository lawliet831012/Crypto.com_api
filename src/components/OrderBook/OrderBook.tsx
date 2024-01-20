'use client';
import { useEffect } from 'react';
import type { JSX } from 'react';
import { useDispatch, quoteThunks } from '@/lib/redux';
import { symbolList } from '@/config/symbols';

const OrderBook = (): JSX.Element => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      quoteThunks.subscribeOrderBook({
        symbols: [...symbolList],
        inherit: false,
      }),
    );
    dispatch(quoteThunks.subscribeQuote(symbolList[0]));
  }, []);
  return <>order books</>;
};

export default OrderBook;
