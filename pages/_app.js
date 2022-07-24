import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { StoreProvider } from "../shared";
import AuthChecker from "../components/AuthChecker";
import Layout from "../components/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
    <Head>
    <script async src="//widget.frill.co/v2/widget.js"></script>
    </Head>
        <AuthChecker>
          <Component {...pageProps} />
        </AuthChecker>
    </StoreProvider>
  );
}

export default MyApp;
