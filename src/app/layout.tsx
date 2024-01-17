/* Components */
import { type JSX } from "react";
import { Providers } from "@/lib/providers";
import { useEffect } from "react";

/* Instruments */
import styles from "./styles/layout.module.css";
import "./styles/globals.css";

export default function RootLayout(props: React.PropsWithChildren): JSX.Element {
  useEffect(() => {
    // client initail function
    
  }, []);

  return (
    <Providers>
      <html lang="en">
        <body>
          <section className={styles.container}>
            <main className={styles.main}>{props.children}</main>
          </section>
        </body>
      </html>
    </Providers>
  );
}
