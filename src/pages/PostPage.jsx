import RequestForm from "../components/RequestForm";
import SignIn from "../components/SignIn";
import { useAuthState } from "../utilities/firebase";

function PostPage() {
  const [user] = useAuthState();
  return <>{user ? <RequestForm redirectPath={"/posts"} /> : <SignIn />}</>;
}

export default PostPage;
