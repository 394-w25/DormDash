import { useAuthState } from "../../utilities/firebase.js";
import RequestTags from "../RequestTags.jsx";
import RequestModal from "./RequestModal.jsx";
import ResolveRequest from "../ResolveRequest.jsx";
import EditRequest from "../EditRequest.jsx";
import DeleteRequest from "../DeleteRequest.jsx";
import { Stack, Group, Text } from "@mantine/core";
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
        <Stack gap="sm" className="relative">
          <RequestTags request={request} />
          <div className="flex flex-col justify-center items-center min-h-20 aspect-square p-2 border-2 rounded-lg absolute top-0 right-0 text-gray-500">
            <Text fw={700}>Max</Text>
            <h2 className="text-2xl">${request.compensation}</h2>
          </div>
          <Text c="dimmed">{request.displayName}</Text>
          <h1 className="w-1/2 sm:w-3/4 text-2xl font-bold">{request.title}</h1>
          <Text>
            Posted on: {new Date(request.timestamp).toLocaleDateString()}
          </Text>
          <Text>{request.description}</Text>
          {user?.uid === request?.userId && (
            <Group>
              <ResolveRequest request={request} />
              <EditRequest request={request} />
              <DeleteRequest request={request} />
            </Group>
          )}
        </Stack>
      </div>
    </>
  );
};

export default Request;
