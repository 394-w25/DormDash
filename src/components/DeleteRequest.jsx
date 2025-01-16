import { Button } from "@mantine/core";
import { useDbRemove } from "../utilities/firebase";

const DeleteRequest = ({ request }) => {
  const [removeData, result] = useDbRemove(
    `users/${request?.userId}/requests/${request?.requestId}`,
  );
  const handleClick = () => {
    removeData();
    console.log(result);
  };
  return <Button onClick={handleClick}>DELETE</Button>;
};

export default DeleteRequest;
