import * as React from 'react';
import moment from 'moment';
import {
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  BarSeries,
  CandlestickSeries,
  OHLCTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  withDeviceRatio,
  withSize,
} from 'react-financial-charts';
import type { CandleStickData, RawData } from '@/lib/redux';

class Candlestick extends React.Component<ChartProps> {
  private readonly margin = { left: 0, right: 60, top: 0, bottom: 24 };
  private readonly timeDisplayFormat = (time: Date): string =>
    moment(time).format('HH:mm');

  private readonly xScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      (d: CandleStickData) => d.date,
    );

  public render(): JSX.Element {
    const { data: initialData, height, ratio, width } = this.props;

    const convertedData: CandleStickData[] = initialData.map(
      (item: RawData) => {
        return {
          close: Number(item.c),
          high: Number(item.h),
          low: Number(item.l),
          open: Number(item.o),
          volume: Number(item.v),
          date: new Date(item.t),
        };
      },
    );

    const { data, xScale, xAccessor, displayXAccessor } =
      this.xScaleProvider(convertedData);

    const max = xAccessor(data[data.length - 1]);
    const min = xAccessor(data[Math.max(0, data.length - 100)]);

    const gridHeight = height - this.margin.top - this.margin.bottom;
    const barChartHeight = gridHeight / 4;
    const barChartOrigin = (_: number, h: number): number[] => [
      0,
      h - barChartHeight,
    ];
    const xExtents = [min, max];

    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width}
        margin={this.margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        <Chart id={0} yExtents={this.yExtents}>
          <OHLCTooltip origin={[8, 16]} />
          <XAxis showTickLabel={false} showTicks={false} axisAt="top" />
          <YAxis showTickLabel={false} showTicks={false} axisAt="left" />
          <XAxis showGridLines />
          <YAxis showGridLines />
          <CandlestickSeries />
          <EdgeIndicator
            itemType="last"
            rectWidth={this.margin.right}
            fill={this.openCloseColor}
            lineStroke={this.openCloseColor}
            yAccessor={this.yEdgeIndicator}
          />

          <MouseCoordinateX displayFormat={this.timeDisplayFormat} />
          <MouseCoordinateY
            rectWidth={this.margin.right}
            displayFormat={(v) => v.toString()}
          />
        </Chart>
        <Chart
          id={1}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={this.barChartExtents}
        >
          <BarSeries yAccessor={this.volumeSeries} />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }

  private readonly barChartExtents = (data: CandleStickData): number => {
    return data.volume;
  };

  private readonly volumeSeries = (data: CandleStickData): number => {
    return data.volume;
  };

  private readonly yExtents = (data: CandleStickData): [number, number] => {
    return [data.high, data.low];
  };

  private readonly yEdgeIndicator = (data: CandleStickData): number => {
    return data.close;
  };

  private readonly openCloseColor = (data: CandleStickData): string => {
    return data.close > data.open ? '#26a69a' : '#ef5350';
  };
}

type ChartProps = {
  readonly data: RawData[];
  readonly height: number;
  readonly width: number;
  readonly ratio: number;
};

export default withSize({ style: { minHeight: 600, width: '100%' } })(
  withDeviceRatio()(Candlestick),
);
