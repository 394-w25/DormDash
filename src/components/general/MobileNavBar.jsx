import { useNavigate } from "react-router-dom";
import { IconHome, IconPlus, IconUser } from "@tabler/icons-react";

export function MobileNavBar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed z-50 bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-300 p-3 flex justify-around items-center sm:hidden">
      <button
        onClick={() => navigate("/posts")}
        className="flex flex-col items-center text-gray-600 hover:text-black"
      >
        <IconHome size={24} stroke={2} />
        <span className="text-xs">Home</span>
      </button>
      <button
        onClick={() => navigate("/post")}
        className="flex flex-col items-center bg-green-600 text-white p-3 rounded-full shadow-md hover:bg-green-700"
      >
        <IconPlus size={24} stroke={2} />
      </button>
      <button
        onClick={() => navigate("/profile")}
        className="flex flex-col items-center text-gray-600 hover:text-black"
      >
        <IconUser size={24} stroke={2} />
        <span className="text-xs">Profile</span>
      </button>
    </nav>
  );
}
