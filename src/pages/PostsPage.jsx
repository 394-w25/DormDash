import { useAuthState } from "../utilities/firebase";
import SignIn from "../components/SignIn.jsx";
import Posts from "../components/Posts.jsx";

const PostsPage = () => {
  const [user] = useAuthState();
  return <>{user ? <Posts /> : <SignIn />}</>;
};

export default PostsPage;
