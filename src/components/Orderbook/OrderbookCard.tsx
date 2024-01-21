'use client';
import type { JSX } from 'react';
import type { supportedSymbol } from '@/config/symbols';
import { useSelector } from '@/lib/redux';

import styles from './orderbook.module.css';

const OrderBookCard = ({
  symbol,
}: {
  symbol: supportedSymbol;
}): JSX.Element => {
  const orderBook = useSelector((state) => state.orderbook[symbol].orderbook);
  return (
    <section className={styles.cards}>
      <h1>{symbol}</h1>
      {orderBook.asks.map((ask) => (
        <div
          key={`${symbol}-ask-${ask[0]}`}
          className={`${styles.row} ${styles.ask}`}
        >
          <span>{ask[0]}</span>
          <span>{ask[1]}</span>
        </div>
      ))}
      {orderBook.bids.map((bid) => (
        <div
          key={`${symbol}-bid-${bid[0]}`}
          className={`${styles.row} ${styles.bid}`}
        >
          <span>{bid[0]}</span>
          <span>{bid[1]}</span>
        </div>
      ))}
    </section>
  );
};

export default OrderBookCard;
