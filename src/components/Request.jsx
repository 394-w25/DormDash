import { useAuthState } from "../utilities/firebase.js";
import RequestInfo from "./RequestInfo.jsx";
import RequestModal from "./RequestModal.jsx";
import ResolveRequest from "./ResolveRequest.jsx";
import EditRequest from "./EditRequest.jsx";
import DeleteRequest from "./DeleteRequest.jsx";
import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAuthState } from "../utilities/firebase.js";

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
        {user?.uid === request?.userId && (
          <Group>
            <ResolveRequest request={request} />
            <EditRequest request={request} />
            <DeleteRequest request={request} />
          </Group>
        )}
        <RequestInfo request={request} />
      </div>
    </>
  );
};

export default Request;
