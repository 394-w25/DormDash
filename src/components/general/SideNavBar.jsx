import { IconHome, IconUser } from "@tabler/icons-react";
import { ScrollArea } from "@mantine/core";
import { LinksGroup } from "./NavbarLinksGroup";

const data = [
  { label: "Home", icon: IconHome, link: "/posts" },
  {
    label: "Your Profile",
    icon: IconUser,
    link: "/profile",
  },
];

export function SideNavBar({ scrollToSection }) {
  const links = data.map((item) => (
    <LinksGroup {...item} key={item.label} onClick={scrollToSection} />
  ));

  return (
    <nav
      role="desktop-navigation"
      data-testid="sidebar"
      className="hidden sm:block bg-white h-window h-auto w-52 min-w-52 p-[20px] pt-[5px] flex flex-col border-r border-gray-300"
    >
      <ScrollArea className="flex-1 -mx-md">
        <div>{links}</div>
      </ScrollArea>
    </nav>
  );
}
