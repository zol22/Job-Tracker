import '../styles/globals.css';
import { AppProps } from 'next/app';

/*-- New file for global configuration */
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
