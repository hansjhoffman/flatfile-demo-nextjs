import type { AppProps } from "next/app";

import "../styles/globals.css";
import "../js/devs";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
