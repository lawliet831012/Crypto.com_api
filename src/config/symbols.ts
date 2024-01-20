export const symbolList = [
  'BTCUSD-PERP',
  'ETHUSD-PERP',
  'SOL_USD',
  'XRP_USD',
  'ADA_USD',
  'MATIC_USD',
] as const;
export type supportedSymbol = (typeof symbolList)[number];

export const orderbookDepth = 10;
