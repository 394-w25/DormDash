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
      //   { label: "Pending Requests", link: "/profile/pending" }, // ***refs for autoscroll positions, need to implement
      { label: "Completed Requests", link: "/profile" },
    ],
  },
];

export function SideNavBar({ scrollToSection }) {
  const links = data.map((item) => (
    <LinksGroup {...item} key={item.label} onClick={scrollToSection} />
  ));

  return (
    <nav
      role="navigation"
      data-testid="sidebar"
      className="bg-white h-screen h-auto w-12 lg:w-52 lg:min-w-52 p-[20px] pt-[5px] mr-4 flex flex-col border-r border-gray-300"
      // className="bg-white h-screen w-20 min-w-20 sm:w-48 sm:min-w-48 lg:w-52 lg:min-w-52 p-4 border-r border-gray-300 flex flex-col"
    >
      <ScrollArea className="flex-1 -mx-md">
        <div>{links}</div>
      </ScrollArea>
    </nav>
  );
}
