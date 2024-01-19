'use client';
import { useEffect, type JSX, type ReactNode } from 'react';
import { websocketSlice, useDispatch } from '@/lib/redux';

function ClientProviders({ children }: { children: ReactNode }): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    // client initail
    console.log('init');

    dispatch(
      websocketSlice.actions.connect({
        id: 'CRYPTO_COM_MARKET_WSS',
        url: `${process.env.NEXT_PUBLIC_STREAM_URL}/v1/market`,
      })
    );

    return () => {};
  }, []);
  return <>{children}</>;
}

export default ClientProviders;
