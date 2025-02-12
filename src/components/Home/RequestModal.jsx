import { Button, Group, Text, Modal, Stack } from "@mantine/core";
import RequestTags from "../RequestTags";

const RequestModal = ({ opened, onClose, request, user }) => {
  const emailSubject = `Inquiry about: ${request.title}`;
  const emailBody = `Hello ${request.displayName},\n\nI’m interested in your request titled "${request.title}". Please let me know more details.\n\nBest regards,\n${user.displayName}`;
  const emailLink = `https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&su=${encodeURIComponent(
    emailSubject,
  )}&to=${encodeURIComponent(request.email)}&body=${encodeURIComponent(emailBody)}`;

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

            {request.imageUrl && (
              <div className="w-full flex justify-center">
                <img
                  src={request.imageUrl}
                  alt="Request"
                  className="w-auto max-w-full max-h-[300px] object-contain rounded-lg"
                />
              </div>
            )}

            <div className="flex flex-col">
              <Text>Posted by: {request.displayName}</Text>
              <Text>
                Posted on: {new Date(request.timestamp).toLocaleString()}
              </Text>
              <Text>
                Deadline:{" "}
                {request.deadline
                  ? new Date(request.deadline).toLocaleString()
                  : "N/A"}
              </Text>
              <Text>Location: {request.location}</Text>
            </div>
            <Text>{request.description}</Text>
            <Text>Max compensation: ${request.compensation}</Text>
            <Group justify="space-between">
              <Button onClick={onClose}>BACK</Button>
              {!request.isFulfilled && (
                <Button
                  component="a"
                  href={emailLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CONTACT
                </Button>
              )}
            </Group>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default RequestModal;
