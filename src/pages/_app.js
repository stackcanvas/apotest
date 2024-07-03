// Import Custom Components
import Layout from "@/components/Layout";

// Import Library Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import "react-credit-cards/es/styles-compiled.css";

// Import Global Styles
import "@/styles/globals.scss";
import { ConfigProvider } from "antd";
import { THEME } from "@/styles/theme";

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider theme={THEME}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ConfigProvider>
  );
}
