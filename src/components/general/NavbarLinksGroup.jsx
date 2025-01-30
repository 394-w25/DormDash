import { useState } from "react";
import { NavLink } from "react-router-dom";

import { IconChevronRight } from "@tabler/icons-react";
import { Box, Collapse, Text, ThemeIcon } from "@mantine/core";

export const LinksGroup = ({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
  onClick,
}) => {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);

  const handleNavigation = (url) => {
    if (url.startsWith("#")) {
      const section = url.substring(1);
      if (onClick) {
        onClick(section); // Call scrollToSection with the section ID
      }
    }
  };

  const items = hasLinks
    ? links.map((linkItem) => (
        <Text
          component="button"
          className="font-medium block text-sm pl-6 ml-4 border-l border-gray-300 hover:bg-gray-100 hover:text-black"
          style={{
            padding: "10px",
            fontSize: "15px",
            cursor: "pointer",
            textAlign: "left",
            backgroundColor: "transparent",
          }}
          key={linkItem.label}
          onClick={() => handleNavigation(linkItem.link)}
        >
          {linkItem.label}
        </Text>
      ))
    : null;

  return (
    <>
      <NavLink
        to={link}
        className={({ isActive }) =>
          `font-medium block rounded w-full p-3 text-sm flex items-center justify-between ${
            isActive ? "text-black bg-blue-100" : "text-gray-900"
          } hover:bg-gray-100 hover:text-black`
        }
        aria-current={({ isActive }) => (isActive ? "page" : undefined)}
      >
        <div className="flex items-center">
          <ThemeIcon
            variant="light"
            size={30}
            className={({ isActive }) => (isActive ? "bg-blue-500" : "")}
          >
            <Icon
              size={18}
              className={({ isActive }) =>
                isActive ? "text-white" : "text-gray-600"
              }
            />
          </ThemeIcon>
          <span className="ml-4">{label}</span>
        </div>

        {hasLinks && (
          <div
            onClick={(e) => {
              e.preventDefault();
              setOpened((o) => !o);
            }}
            className="px-2 cursor-pointer"
          >
            <IconChevronRight
              className={`transition-transform duration-200 ${
                opened ? "rotate-90" : ""
              } text-gray-600 dark:text-gray-300 mr-2`}
              stroke={1.5}
              size={16}
            />
          </div>
        )}
      </NavLink>

      {hasLinks && (
        <Collapse in={opened} className="ml-6">
          {items}
        </Collapse>
      )}
    </>
  );
};
