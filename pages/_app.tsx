import { AppProps } from "next/app";
import { env } from "process";
import { Provider } from "react-redux";
import store, { wrapper } from "../app/store";
import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
