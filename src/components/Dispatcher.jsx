import { BrowserRouter, Routes, Route } from "react-router-dom"; // Add this line
import HomePage from "../pages/HomePage"; // Ensure the case matches your file name
import PostsPage from "../pages/PostsPage";

const Dispatcher = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Dispatcher;
