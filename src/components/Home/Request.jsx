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
      <RequestModal
        opened={opened}
        onClose={close}
        request={request}
        user={user ? user : { displayName: "Guest" }}
      />
      <div
        onClick={open}
        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 flex flex-row items-start space-x-4 relative min-h-[180px] cursor-pointer"
      >
        <Stack gap="sm" className="relative flex-1 min-h-full">
          <RequestTags request={request} />
          <div className="absolute top-0 right-0 flex flex-col items-center min-w-20 p-2 border-2 rounded-lg text-gray-500 bg-white shadow-md">
            <Text fw={700}>Max</Text>
            <h2 className="text-2xl">${request.compensation}</h2>
          </div>

          <Text className="!text-md !text-gray-500 !font-bold">
            {request.displayName}
          </Text>
          <h1 className="w-3/4 my-1 text-3xl text-gray-700 font-bold">
            {request.title}
          </h1>
          <Text className="!text-sm !text-gray-500 !font-bold !w-3/4">
            Posted on: {new Date(request.timestamp).toLocaleDateString()} ·{" "}
            {request.location}
          </Text>

          <Text className="!text-sm !text-gray-500 !w-3/4">
            {request.description}
          </Text>

          {user?.uid === request?.userId && (
            <Group className="!mt-2 !gap-x-1 !justify-start">
              <ResolveRequest request={request} className="px-5 py-1 text-lg" />
              <EditRequest request={request} className="px-3 py-1 text-sm" />
              <DeleteRequest request={request} className="px-3 py-1 text-sm" />
            </Group>
          )}
        </Stack>
        {request.imageUrl && (
          <div className="absolute right-5 bottom-12 w-20 h-20">
            <img
              src={request.imageUrl}
              alt="Request"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Request;
