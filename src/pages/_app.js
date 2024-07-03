import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Import Custom Components
import Layout from "@/components/Layout";

// Import Library Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import "react-toastify/dist/ReactToastify.css";
import "react-credit-cards/es/styles-compiled.css";

// Import Global Styles
import "@/styles/globals.scss";
import { ConfigProvider } from "antd";
import { THEME } from "@/styles/theme";

export default function App({ Component, pageProps }) {
  const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  return (
    <ConfigProvider theme={THEME}>
      <Elements stripe={stripe}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Elements>
    </ConfigProvider>
  );
}
