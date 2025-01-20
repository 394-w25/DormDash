import { Button } from "@mantine/core";
import { useDbUpdate } from "../utilities/firebase.js";

const ResolveRequest = ({ request }) => {
  const [updateData, result] = useDbUpdate(
    `users/${request?.userId}/requests/${request?.requestId}`,
  );
  const handleClick = (e) => {
    e.stopPropagation();
    updateData({ isFulfilled: !request.isFulfilled });
    console.log(result);
  };
  return (
    <Button onClick={handleClick}>
      {request.isFulfilled ? "REOPEN" : "RESOLVE"}
    </Button>
  );
};

export default ResolveRequest;
