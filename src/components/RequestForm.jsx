import {
  Stack,
  TextInput,
  NumberInput,
  Checkbox,
  Button,
  Textarea,
} from "@mantine/core";
import { useDbUpdate, useAuthState } from "../utilities/firebase";
import { useState } from "react";

// if request is provided, assumes form is in edit state
const RequestForm = ({ redirectPath, request, callback }) => {
  const [user] = useAuthState();
  const [tagErrorMsg, setTagErrorMsg] = useState("");
  const [compensationErrorMsg, setCompensationErrorMsg] = useState("");
  const [titleErrorMsg, setTitleErrorMsg] = useState("");
  const [updateData] = useDbUpdate(`users/${user?.uid}/requests`); // path to current user's requests
  const TAGS = ["Buy", "Sell", "Borrow", "Other"];

  const validate = (formData) => {
    let isValid = true;
    const title = formData.get("title");
    if (title.length > 50) {
      setTitleErrorMsg("Title cannot exceed 50 characters.");
      isValid = false;
    } else {
      setTitleErrorMsg("");
    }
    if (formData.get("compensation") < 0) {
      setCompensationErrorMsg("Compensation cannot be negative.");
      isValid = false;
    } else if (formData.get("compensation") > 1000) {
      setCompensationErrorMsg("Compensation cannot exceed $1000.");
      isValid = false;
    } else setCompensationErrorMsg("");
    if (formData.get("tags").length === 0) {
      setTagErrorMsg("Please select at least one tag.");
      isValid = false;
    } else setTagErrorMsg("");
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const tags = TAGS.map((tag) => formData.get(tag)).filter(
      (tag) => tag !== null,
    );
    formData.append("tags", tags);
    if (!validate(formData)) return;
    const requestData = {
      [request ? request.requestId : `request_${Date.now()}`]: {
        title: formData.get("title"),
        location: formData.get("location"),
        description: formData.get("description"),
        compensation: parseInt(formData.get("compensation")),
        tags: formData.get("tags"),
        timestamp: Date.now(),
      },
    };
    updateData(requestData);
    if (redirectPath !== undefined) {
      navigate(redirectPath);
    }
    if (callback) callback();
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="grid grid-cols-3 gap-x-8">
          <h1 className="text-lg font-semibold col-span-3">Request Details</h1>
          <Stack className="col-span-2">
            <TextInput
              label="Title"
              name="title"
              placeholder="Request title"
              defaultValue={request?.title}
              required
              error={titleErrorMsg}
            />
            <TextInput
              label="Location"
              name="location"
              placeholder="Location"
              defaultValue={request?.location}
              required
            />
            <Textarea
              label="Body"
              name="description"
              placeholder="Request description"
              defaultValue={request?.description}
              autosize
              maxRows={4}
              required
            />
            <NumberInput
              label="Compensation"
              name="compensation"
              placeholder="0"
              defaultValue={request?.compensation}
              error={compensationErrorMsg}
            />
          </Stack>
          <Stack align="end">
            <Checkbox.Group
              label="Tags (select at least one)"
              error={tagErrorMsg}
              classNames={{ error: "[margin-top:_1rem_!important]" }}
            ></Checkbox.Group>
            <Stack justify="start" className="w-full">
              {TAGS.map((tag, idx) => (
                <Checkbox
                  key={idx}
                  name={tag}
                  value={tag}
                  label={tag}
                  defaultChecked={request?.tags.includes(tag)}
                  className="mt-2"
                />
              ))}
            </Stack>
          </Stack>
        </div>
        <div className="sm:w-1/4 mx-auto">
          <Button type="submit" size="md" fullWidth={true}>
            {request ? "Update" : "Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
