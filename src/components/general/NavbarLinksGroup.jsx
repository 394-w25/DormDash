import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IconChevronRight } from "@tabler/icons-react";
import {
  Box,
  Collapse,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";

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
  const navigate = useNavigate();

  const handleNavigation = (url) => {
    const isInPageSection = url.startsWith("/profile");
    if (isInPageSection && onClick) {
      const section = url.split("/").pop();
      onClick(section); // call scrollToSection
    } else {
      navigate(url);
    }
  };

  const items = (hasLinks ? links : []).map((link) => (
    <Text
      component="a"
      className="font-medium block text-sm text-gray-600 pl-6 ml-4 border-l border-gray-300 hover:bg-gray-100 hover:text-black"
      style={{ padding: "10px", fontSize: "15px" }}
      href={link.link}
      key={link.label}
      onClick={(e) => {
        e.preventDefault();
        handleNavigation(link.link);
      }}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => handleNavigation(link)}
        className="font-medium block rounded w-full p-xl text-gray-900 text-sm hover:bg-gray-100 hover:text-black "
      >
        <Group justify="space-between" gap={0}>
          <Box className="flex items-center p-[10px]">
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setOpened((o) => !o);
              }}
              className="px-2"
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
        </Group>
      </UnstyledButton>
      {hasLinks && (
        <Collapse in={opened} className="ml-6">
          {links.map((sublink) => (
            <Text
              key={sublink.label}
              component="a"
              className="font-medium block text-sm text-gray-600 pl-6 border-l border-gray-300 hover:bg-gray-100 hover:text-black"
              style={{ padding: "10px", fontSize: "15px" }}
              href={sublink.link}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(sublink.link);
              }}
            >
              {sublink.label}
            </Text>
          ))}
        </Collapse>
      )}
    </>
  );
};
