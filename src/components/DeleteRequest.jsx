import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useDbRemove } from "../utilities/firebase";

const DeleteRequest = ({ request }) => {
  const [removeData, result] = useDbRemove(
    `users/${request?.userId}/requests/${request?.requestId}`,
  );
  const handleClick = () => {
    removeData();
    console.log(result);
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
