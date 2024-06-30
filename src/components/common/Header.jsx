import Image from "next/image";
import MainMenu from "./partials/MainMenu";
import { useEffect, useRef } from "react";
import MobileMenu from "./partials/MobileMenu";

const Header = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e) => {
    if (window.pageYOffset > 100) {
      headerRef.current?.classList.add("!bg-white");
    } else {
      headerRef.current?.classList?.contains("!bg-white") &&
        headerRef.current?.classList.remove("!bg-white");
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-20 bg-transparent py-4 lg:py-0"
      ref={headerRef}
    >
      <div className="header-middle">
        <div className="container flex items-center justify-between">
          <div className="header-left">
            <Image src="/images/logo.png" width={150} height={50} alt="Logo" />
          </div>

          <div className="header-right">
            <MainMenu />

            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
