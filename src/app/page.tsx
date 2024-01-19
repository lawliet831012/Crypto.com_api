/* Components */
import { type JSX } from 'react';
import { Counter } from '@/components/Counter/Counter';

export default function IndexPage(): JSX.Element {
  return <Counter />;
}

export const metadata = {
  title: 'Redux Toolkit',
};
