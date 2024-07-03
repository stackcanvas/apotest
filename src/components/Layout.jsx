// Import Custom Components
import { ToastContainer } from "react-toastify";
import Footer from "./common/Footer";
import Header from "./common/Header";

const Layout = ({ children }) => {
  return (
    <>
      <div className="page-wrapper">
        <Header />
        {children}
        <Footer />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />{" "}
    </>
  );
};

export default Layout;
