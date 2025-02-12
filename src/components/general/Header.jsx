import { Group } from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/dormdash-logo.svg";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header
      role="header"
      className="sticky z-50 top-0 h-14 bg-body-light border-b border-gray-200 px-md"
    >
      <div className="h-14 flex justify-between items-center">
        <Group>
          <img src={logo} alt="DormDash Logo" style={{ height: 24 }} />
          <Link to="/posts" className="font-lato font-black text-[24px]">
            DormDash
          </Link>
        </Group>
        {(location.pathname === "/posts" || location.pathname === "/") && (
          <button
            onClick={() => navigate("/post")}
            className="hidden sm:flex px-6 py-1 bg-green-600 text-white rounded-md border-none cursor-pointer hover:bg-green-700"
          >
            + Post New Request
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
