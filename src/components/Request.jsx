import RequestInfo from "./RequestInfo.jsx";
import RequestModal from "./RequestModal.jsx";
import { useDisclosure } from "@mantine/hooks";

const Request = ({ request }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <RequestModal opened={opened} onClose={close} request={request} />
      <div
        onClick={open}
        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
      >
        <RequestInfo request={request} />
      </div>
    </>
  );
};

export default Request;
