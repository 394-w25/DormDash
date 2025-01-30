import {
  Stack,
  TextInput,
  NumberInput,
  MultiSelect,
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
    // const tags = TAGS.map((tag) => formData.get(tag)).filter(
    //   (tag) => tag !== null,
    // );
    const tags = formData.getAll("tags");

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
    <div className="p-8">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Create New Request</h1>
        <div className="grid grid-cols-3 gap-x-8 gap-y-4">
          {/* Row 1: Request Title */}
          <div className="col-span-2">
            <TextInput
              label="Request Title"
              name="title"
              placeholder="Enter a descriptive title"
              defaultValue={request?.title}
              required
              error={titleErrorMsg}
              description="Max 50 characters"
              classNames={{
                input: "bg-gray-100",
                label: "text-lg font-medium text-gray-800",
                error: "text-red-500 mt-1",
              }}
            />
          </div>

          <div>
            <MultiSelect
              label="Tags"
              name="tags"
              placeholder="Tags"
              data={TAGS.map((tag) => ({ value: tag, label: tag }))}
              error={tagErrorMsg}
              searchable
              clearable
              description="Select all that apply"
              classNames={{
                input: "bg-gray-100",
                label: "text-lg font-medium text-gray-800",
                error: "text-red-500 mt-1",
              }}
              dropdownPosition="bottom"
              withinPortal
              nothingFound="No tags available"
              styles={{
                input: { width: "300px" },
                dropdown: { width: "300px" },
              }}
            />
          </div>

          <div>
            <TextInput
              label="Deadline"
              name="deadline"
              placeholder="MM/DD/YYYY"
              type="date"
              required
              classNames={{
                input: "bg-gray-100",
                label: "text-lg font-medium text-gray-800",
              }}
            />
          </div>
          <div>
            <TextInput
              label="Location"
              name="location"
              placeholder="e.g. Schapiro"
              defaultValue={request?.location}
              required
              classNames={{
                input: "bg-gray-100",
                label: "text-lg font-medium text-gray-800",
              }}
            />
          </div>

          <div className="col-span-2">
            <Textarea
              label="Description"
              name="description"
              placeholder="Description"
              defaultValue={request?.description}
              autosize
              required
              description="Describe your request. Include any important information."
              classNames={{
                input: "bg-gray-100",
                label: "text-lg font-medium text-gray-800",
              }}
            />
          </div>

          <div className="col-span-2">
            <NumberInput
              label="Max Compensation"
              name="compensation"
              placeholder="Amount"
              defaultValue={request?.compensation}
              error={compensationErrorMsg}
              description="Maximum amount of payment for request fulfillment"
              min={0}
              classNames={{
                input: "bg-gray-100",
                label: "text-lg font-medium text-gray-800",
                error: "text-red-500 mt-1",
              }}
            />
          </div>
        </div>

        <div className="fixed bottom-10 right-10">
          <Button
            type="submit"
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {request ? "Update" : "Post New Request"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
