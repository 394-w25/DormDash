import RequestForm from "../components/RequestForm";
import SignIn from "./SignIn";
import { useAuthState } from "../utilities/firebase";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

function PostPage() {
  const navigate = useNavigate();
  const redirectToPosts = () => navigate("/posts");
  const notifySuccess = () =>
    notifications.show({
      title: "Posted successfully",
      message: "Your post is now live for others to see!",
      icon: <IconCheck />,
      color: "green",
    });
  const [user] = useAuthState();
  return (
    <>
      {user ? (
        <RequestForm
          callback={() => {
            notifySuccess();
            redirectToPosts();
          }}
        />
      ) : (
        <SignIn />
      )}
    </>
  );
}

export default PostPage;
