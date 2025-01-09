import { useAuthState } from "../utilities/firebase";
import Posts from "../components/Posts.jsx";

const PostsPage = () => {
  const [user] = useAuthState();
  return <>{user ? <Posts /> : <h1>Sign in first</h1>}</>;
};

export default PostsPage;
