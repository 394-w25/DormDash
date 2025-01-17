import { useAuthState } from "../utilities/firebase.js";
import EditRequest from "./EditRequest.jsx";
import RequestInfo from "./RequestInfo.jsx";
import RequestModal from "./RequestModal.jsx";
import { useDisclosure } from "@mantine/hooks";

const Request = ({ request }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [user] = useAuthState();
  return (
    <>
      <RequestModal opened={opened} onClose={close} request={request} />
      <div
        onClick={open}
        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
      >
        {user?.uid === request?.userId && <EditRequest request={request} />}
        <RequestInfo request={request} />
      </div>
    </>
  );
};

export default Request;
