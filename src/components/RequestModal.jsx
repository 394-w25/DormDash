import { Button, Group, Text, Modal, Stack } from "@mantine/core";
import RequestTags from "./RequestTags";

const RequestModal = ({ opened, onClose, request }) => {
  return (
    <Modal.Root opened={opened} onClose={onClose} size="lg" centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Body>
          <Stack>
            <Group justify="space-between">
              <Text size="xl" fw={700}>
                Request
              </Text>
              <RequestTags request={request} />
            </Group>
            <h1 className="text-2xl font-bold">{request.title}</h1>
            <div className="flex flex-col">
              <Text>Posted by: {request.displayName}</Text>
              <Text>
                Posted on: {new Date(request.timestamp).toLocaleString()}
              </Text>
              <Text>Location: {request.location}</Text>
            </div>
            <Text>{request.description}</Text>
            <Text>Max compensation: ${request.compensation}</Text>
            <Group justify="space-between">
              <Button onClick={onClose}>BACK</Button>
              {!request.isFulfilled && (
                <Button onClick={() => alert("Email")}>CONTACT</Button>
              )}
            </Group>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default RequestModal;
