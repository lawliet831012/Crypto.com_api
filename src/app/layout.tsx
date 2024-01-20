/* Components */
import { type JSX } from 'react';
import { Providers } from '@/lib/providers';
import ClientProviders from './ClientProviders';

/* Instruments */
import styles from '@/styles/layout.module.css';
import '@/styles/globals.css';

export default function RootLayout(
  props: React.PropsWithChildren,
): JSX.Element {
  return (
    <Providers>
      <html lang="en">
        <body>
          <section className={styles.container}>
            <main className={styles.main}>
              <ClientProviders>{props.children}</ClientProviders>
            </main>
          </section>
        </body>
      </html>
    </Providers>
  );
}
