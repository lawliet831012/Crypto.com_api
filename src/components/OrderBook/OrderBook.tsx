'use client';
import { useEffect } from 'react';
import type { JSX } from 'react';
import { useDispatch, quoteThunks } from '@/lib/redux';
import { symbolList } from '@/config/symbols';
import OrderBookCard from './OrderBookCard';

import styles from './orderbook.module.css';

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

  return (
    <section className={styles.container}>
      {symbolList.map((symbol) => (
        <OrderBookCard key={`${symbol}-orderbook-card`} symbol={symbol} />
      ))}
    </section>
  );
};

export default OrderBook;
