import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { StoreProvider } from "../shared";
import AuthChecker from "../components/AuthChecker";
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layout>
        <AuthChecker>
          <Component {...pageProps} />
        </AuthChecker>
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
