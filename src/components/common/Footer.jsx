import ALink from "../features/ALink";

const Footer = () => {
  const FooterData = [
    {
      title: "OM OS",
      url: "/",
    },
    {
      title: "KONTAKT",
      url: "/",
    },
    {
      title: "FAQs",
      url: "/",
    },
    {
      title: "HANDELSBETIGNELSER",
      url: "/",
    },
    {
      title: "PRIVATLIVSPOLITIK",
      url: "/",
    },
    {
      title: "SIKKERHED",
      url: "/",
    },
    {
      title: "COOKIES",
      url: "/",
    },
  ];

  return (
    <footer className="bg-black py-10">
      <div className="container">
        <ul className="footer-middle lg:flex items-center justify-center lg:space-x-10">
          {FooterData?.map((item, index) => (
            <li key={index}>
              <ALink href={item?.url} className="text-white py-1">{item?.title}</ALink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
