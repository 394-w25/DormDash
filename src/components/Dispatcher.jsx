import { BrowserRouter, Routes, Route } from "react-router-dom"; // Add this line
import HomePage from "../pages/HomePage"; // Ensure the case matches your file name
import ProfilePage from "../pages/ProfilePage";

const Dispatcher = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Dispatcher;
