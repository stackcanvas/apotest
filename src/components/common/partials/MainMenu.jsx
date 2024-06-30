import ALink from "@/components/features/ALink";

const MainMenu = () => {
  const Menu = [
    {
      title: "Klamydia",
      url: "/",
    },
    {
      title: "Ghonorre",
      url: "/",
    },
    {
      title: "FAQs",
      url: "/",
    },
    {
      title: "Ordre oversigt",
      url: "/",
    },
  ];

  return (
    <ul className="lg:flex items-center space-x-10 hidden">
      {Menu?.map((menu, index) => (
        <li key={index}>
          <ALink href={menu.url} className={`py-7 ${index === 0 ? "border-t-2 border-primary" : ""}`}>
            {menu.title}
          </ALink>
        </li>
      ))}
    </ul>
  );
};

export default MainMenu;
