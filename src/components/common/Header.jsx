import Image from "next/image";
import MainMenu from "./partials/MainMenu";
import { useEffect, useRef } from "react";
import MobileMenu from "./partials/MobileMenu";
import { usePathname } from "next/navigation";
import { ShoppingCartOutlined } from "@ant-design/icons";
import ALink from "../features/ALink";

const Header = () => {
  const headerRef = useRef(null);
  const pathname = usePathname();

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
      className={`z-20 bg-transparent ${
        pathname === "/" ? "fixed top-0 left-0 right-0 py-4 lg:py-0" : "py-4"
      }`}
      ref={headerRef}
    >
      <div className="header-middle">
        <div className="container flex items-center justify-between">
          <div className="header-left">
            <ALink href={"/"}>
              <Image
                src="/images/logo.png"
                width={150}
                height={50}
                alt="Logo"
              />
            </ALink>
          </div>

          <div className="header-right">
            {pathname?.includes("/orders/") ? (
              <>
                <ALink href={"/"} className="flex items-center space-x-4">
                  <span>Fortryd bestilling</span>
                  <ShoppingCartOutlined className="text-2xl" />
                </ALink>
              </>
            ) : (
              <>
                <MainMenu />

                <MobileMenu />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
