/* Instruments */
import { chartSlice } from '@/lib/redux';
import type { RawData, ReduxThunkAction } from '@/lib/redux';
import { type supportedSymbol } from '@/config/symbols';
// import request from '@/lib/utils/request';

export const setChartSymbolAsync =
  (symbol: supportedSymbol): ReduxThunkAction =>
  async (dispatch, getState) => {
    try {
      dispatch(chartSlice.actions.setActive(symbol));

      // i just found out that the first candlestick data includes history data

      // const respond = await request({
      //   url: `/public/get-candlestick`,
      //   params: {
      //     instrument_name: symbol,
      //     timeframe: '1m',
      //     count: 300,
      //   },
      // });
      // const data = respond.data.result.data;

      // dispatch(
      //   chartSlice.actions.updateHistory({
      //     symbol,
      //     data,
      //   }),
      // );
    } catch (error) {
      console.error(error);
    }
  };

export const updateBar =
  (symbol: supportedSymbol, data: RawData): ReduxThunkAction =>
  (dispatch, getState) => {
    try {
      const history = getState().chart.history[symbol].candlesStick;
      const newData = [...history];

      if (newData[newData.length - 1].t === data.t) {
        newData[newData.length - 1] = data;
      } else {
        newData.push(data);
      }

      dispatch(
        chartSlice.actions.updateHistory({
          symbol,
          data: newData,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };
