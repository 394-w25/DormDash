import { Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/dormdash-logo.svg";

const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header
      role="header"
      className="h-14 bg-body-light border-b border-gray-200 px-md"
    >
      <div className="h-14 flex justify-between items-center">
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <img src={logo} alt="DormDash Logo" style={{ height: 24 }} />
          <Link to="/posts" className="font-lato font-black text-[24px]">
            DormDash
          </Link>
        </Group>

        {/* Conditionally render the button only on the /posts route */}
        {location.pathname === "/posts" ||
          ("/" && (
            <button
              onClick={() => navigate("/post")}
              className="px-6 py-1 bg-green-600 text-white rounded-md border-none cursor-pointer hover:bg-green-700"
            >
              Post New Request
            </button>
          ))}
      </div>
    </header>
  );
};

export default Header;
