import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PostPage from "../pages/PostPage";
import PostsPage from "../pages/PostsPage";
import ProfilePage from "../pages/ProfilePage";

const Dispatcher = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user_profile" element={<ProfilePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Dispatcher;
