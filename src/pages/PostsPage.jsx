import { useAuthState } from "../utilities/firebase";
import Posts from "../components/Posts.jsx";

const PostsPage = () => {
  const [user] = useAuthState();
  return (
    <>{user ? <Posts /> : <h1>You must be signed in to see this page.</h1>}</>
  );
};

export default PostsPage;
