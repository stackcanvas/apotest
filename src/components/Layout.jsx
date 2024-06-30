// Import Custom Components
import Footer from "./common/Footer";
import Header from "./common/Header";

const Layout = ({ children }) => {
  return (
    <div className="page-wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
