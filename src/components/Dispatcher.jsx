import HomePage from "../pages/HomePage";
import PostPage from "../pages/PostPage";
import PostsPage from "../pages/PostsPage";
import ProfilePage from "../pages/ProfilePage";

const Dispatcher = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Dispatcher;
