import RequestForm from "../components/RequestForm";
import SignIn from "./SignIn";
import { useAuthState } from "../utilities/firebase";
import { useNavigate } from "react-router-dom";

function PostPage() {
  const navigate = useNavigate();
  const redirectToPosts = () => navigate("/posts");
  const [user] = useAuthState();
  return <>{user ? <RequestForm callback={redirectToPosts} /> : <SignIn />}</>;
}

export default PostPage;
