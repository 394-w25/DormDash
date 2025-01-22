import { IconHome, IconUser } from "@tabler/icons-react";
import { ScrollArea } from "@mantine/core";
import { LinksGroup } from "./NavbarLinksGroup";

const data = [
  { label: "Home", icon: IconHome, link: "/posts" },
  {
    label: "Your Profile",
    icon: IconUser,
    initiallyOpened: false,
    link: "/profile",
    links: [
      { label: "Active Requests", link: "/profile" },
      //   { label: "Pending Requests", link: "/profile/pending" },
      { label: "Completed Requests", link: "/profile" },
    ],
  },
];

export function SideNavBar({ scrollToSection }) {
  const links = data.map((item) => (
    <LinksGroup {...item} key={item.label} onClick={scrollToSection} />
  ));

  return (
    <nav className="bg-white h-window w-52 min-w-52 p-[20px] pt-[5px] mr-4 flex flex-col border-r border-gray-300">
      <ScrollArea className="flex-1 -mx-md">
        <div>{links}</div>
      </ScrollArea>
    </nav>
  );
}
