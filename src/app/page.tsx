/* Components */
import { type JSX } from 'react';
import { OrderBook } from '@/components/OrderBook';
import { Chart } from '@/components/Chart';

import styles from './index.module.css';

export default function IndexPage(): JSX.Element {
  return (
    <main className={styles.container}>
      <Chart />
      <OrderBook />
    </main>
  );
}

export const metadata = {
  title: 'Redux Toolkit',
};
