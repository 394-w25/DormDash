import RequestInfo from "./RequestInfo.jsx";
import RequestModal from "./RequestModal.jsx";
import { useDisclosure } from "@mantine/hooks";
import { useDbUpdate } from "../utilities/firebase.js";

const UserRequest = ({ request, user }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [updateData] = useDbUpdate(`users/${user.uid}/requests/request_${request.timestamp}`);

  const handleResolve = (e) => {
    e.stopPropagation(); // Prevent modal from opening when clicking resolve
    updateData({ isFulfilled: !request.isFulfilled });
  };

  return (
    <>
      <RequestModal opened={opened} onClose={close} request={request} />
      <div
        onClick={open}
        className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 relative
          ${request.isFulfilled ? 'bg-gray-100' : 'bg-white'}`}
      >
        <div className={request.isFulfilled ? 'line-through' : ''}>
          <RequestInfo request={request} />
        </div>
        <button
          onClick={handleResolve}
          className={`absolute top-4 right-4 px-4 py-2 rounded-md transition-colors ${
            request.isFulfilled
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {request.isFulfilled ? 'Reopen' : 'Resolve'}
        </button>
      </div>
    </>
  );
};

export default UserRequest;