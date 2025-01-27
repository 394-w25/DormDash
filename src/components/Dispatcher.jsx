import { Routes, Route } from "react-router-dom";
import PostPage from "../pages/PostPage";
import PostsPage from "../pages/PostsPage";
import ProfilePage from "../pages/ProfilePage";

const Dispatcher = () => {
  return (
    <Routes>
      <Route path="/user_profile" element={<ProfilePage />} />
      <Route path="/" element={<PostsPage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/profile/*" element={<ProfilePage />} />
    </Routes>
  );
};

export default Dispatcher;
