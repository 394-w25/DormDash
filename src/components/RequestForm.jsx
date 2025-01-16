import {
  Group,
  Stack,
  TextInput,
  NumberInput,
  Checkbox,
  Button,
} from "@mantine/core";
import { useDbUpdate, useAuthState } from "../utilities/firebase";

const RequestForm = () => {
  const [user] = useAuthState();
  const [updateData] = useDbUpdate(`users/${user?.uid}/requests`); // path to current user's requests
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const tags = TAGS.map((tag) => formData.get(tag)).filter(
      (tag) => tag !== null,
    );
    const requestData = {
      [`request_${Date.now()}`]: {
        title: formData.title,
        location: formData.location,
        description: formData.description,
        compensation: formData.compensation,
        timestamp: Date.now(),
        tags: tags,
      },
    };
    //updateData(requestData);
  };
  const TAGS = ["Buy", "Sell", "Borrow", "Other"];

  return (
    <>
      <h1>Post a New Request</h1>
      <form onSubmit={handleSubmit}>
        <Group>
          <Stack>
            Request Details
            <TextInput
              label="Title"
              name="title"
              placeholder="Request"
              required
            />
            <TextInput
              label="Location"
              name="location"
              placeholder="Location"
              required
            />
            <TextInput
              label="Body"
              name="description"
              placeholder="Request description"
              required
            />
            <NumberInput
              label="Compensation"
              name="compensation"
              placeholder="0"
            />
          </Stack>
          <Stack>
            <Checkbox.Group label="Tags (select at least one)">
              {TAGS.map((tag, idx) => (
                <Checkbox key={idx} name={tag} value={tag} label={tag} />
              ))}
            </Checkbox.Group>
          </Stack>
        </Group>
        <Button type="submit">Post</Button>
      </form>
    </>
  );
};

export default RequestForm;
