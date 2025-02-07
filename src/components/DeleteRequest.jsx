import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useDbRemove } from "../utilities/firebase";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

const DeleteRequest = ({ request }) => {
  const [removeData] = useDbRemove(
    `users/${request?.userId}/requests/${request?.requestId}`,
  );
  const notifySuccess = () =>
    notifications.show({
      title: "Deleted successfully",
      message: "Your post has been permanently deleted!",
      icon: <IconCheck />,
      color: "green",
    });
  const handleClick = () => {
    removeData();
    notifySuccess();
  };
  const openConfirmModal = (e) => {
    e.stopPropagation();
    modals.openConfirmModal({
      title: "Confirm delete",
      children: <p>Are you sure you want to delete your request?</p>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      onConfirm: handleClick,
    });
  };
  return <Button onClick={openConfirmModal}>DELETE</Button>;
};

export default DeleteRequest;
