/* Components */
import { type JSX } from 'react';
import { OrderBook } from '@/components/OrderBook';

export default function IndexPage(): JSX.Element {
  return (
    <>
      <OrderBook />
    </>
  );
}

export const metadata = {
  title: 'Redux Toolkit',
};
