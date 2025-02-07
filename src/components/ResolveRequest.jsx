import { Button } from "@mantine/core";
import { useDbUpdate } from "../utilities/firebase.js";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

const ResolveRequest = ({ request }) => {
  const [updateData] = useDbUpdate(
    `users/${request?.userId}/requests/${request?.requestId}`,
  );
  const notifySuccess = (title, message) =>
    notifications.show({
      title,
      message,
      icon: <IconCheck />,
      color: "green",
    });
  const handleClick = (e) => {
    e.stopPropagation();
    let title;
    let message;
    if (!request.isFulfilled) {
      title = "Resolved successfully";
      message = "Your post is no longer visible for others to see!";
    } else {
      title = "Reopened successfully";
      message = "Your post is now live for others to see!";
    }
    updateData({ isFulfilled: !request.isFulfilled });
    notifySuccess(title, message);
  };
  return (
    <Button onClick={handleClick}>
      {request.isFulfilled ? "REOPEN" : "RESOLVE"}
    </Button>
  );
};

export default ResolveRequest;
