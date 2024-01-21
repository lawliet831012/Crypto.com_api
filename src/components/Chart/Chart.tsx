'use client';
import type { JSX, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import {
  chartThunks,
  subscriptionThunks,
  useDispatch,
  useSelector,
} from '@/lib/redux';
import { symbolList, periodList } from '@/config/symbols';
import type { supportedSymbol, supportedPeriod } from '@/config/symbols';
import CandleStick from './CandleStick';

import styles from './chart.module.css';

const Chart = (): JSX.Element => {
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState<supportedSymbol>(symbolList[0]);
  const [period, setPeriod] = useState<supportedPeriod>(periodList[0]);
  const data = useSelector((state) => state.chart.history[symbol].candlesStick);

  useEffect(() => {
    dispatch(chartThunks.setChartSymbolAsync(symbol));
    dispatch(subscriptionThunks.subscribeChart(symbol, period));
    return () => {};
  }, [symbol, period]);

  const onSymbolChange = (event: FormEvent<HTMLSelectElement>): void => {
    setSymbol(event.currentTarget.value as supportedSymbol);
  };

  const onPeriodChange = (event: FormEvent<HTMLSelectElement>): void => {
    setPeriod(event.currentTarget.value as supportedPeriod);
  };

  return (
    <div className={styles.container}>
      <header className={styles.title}>
        <select onChange={onSymbolChange}>
          {symbolList.map((symbol) => (
            <option key={`select-option-${symbol}`} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
        <select onChange={onPeriodChange}>
          {periodList.map((period) => (
            <option key={`select-option-${period}`} value={period}>
              {period}
            </option>
          ))}
        </select>
      </header>
      <CandleStick data={data} />
    </div>
  );
};

export default Chart;
