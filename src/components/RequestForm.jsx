import {
  TextInput,
  NumberInput,
  MultiSelect,
  Button,
  FileInput,
  Textarea,
} from "@mantine/core";
import { useDbUpdate, useAuthState } from "../utilities/firebase";
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// if request is provided, assumes form is in edit state
const RequestForm = ({ redirectPath, request, callback }) => {
  const [user] = useAuthState();
  const [tagErrorMsg, setTagErrorMsg] = useState("");
  const [compensationErrorMsg, setCompensationErrorMsg] = useState("");
  const [titleErrorMsg, setTitleErrorMsg] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [updateData] = useDbUpdate(`users/${user?.uid}/requests`);
  const TAGS = ["Buy", "Sell", "Borrow", "Transportation", "Cleaning", "Other"];

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

  const handleImageChange = (file) => {
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const tags = formData.getAll("tags");
    formData.append("tags", tags);
    if (!validate(formData)) return;

    let imageUrl = request?.imageUrl || "";
    const requestId = request ? request.requestId : `request_${Date.now()}`;
    if (image) {
      const storage = getStorage();
      const imageRef = ref(
        storage,
        `requests/${user.uid}/${requestId}/${image.name}`,
      );
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const requestData = {
      [request ? request.requestId : `request_${Date.now()}`]: {
        title: formData.get("title"),
        location: formData.get("location"),
        description: formData.get("description"),
        compensation: parseInt(formData.get("compensation")),
        tags: formData.get("tags"),
        timestamp: Date.now(),
        imageUrl,
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
        <h1 className="text-2xl font-bold mb-6">
          {request ? "Edit Request" : "Create New Request"}
        </h1>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="col-span-2">
            <TextInput
              label="Request Title"
              name="title"
              placeholder="Enter a descriptive title"
              defaultValue={request?.title}
              required
              error={titleErrorMsg}
              description="Max 50 characters."
              classNames={{
                input: "bg-gray-100",
                label: "text-lg font-medium text-gray-800",
                error: "text-red-500 mt-1",
              }}
            />
          </div>

          <div className="col-span-2">
            <FileInput
              accept="image/png,image/jpeg"
              label="Upload Image"
              placeholder="Upload Image"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="col-span-2">
            <MultiSelect
              label="Tags"
              name="tags"
              placeholder="Tags"
              data={TAGS.map((tag) => ({ value: tag, label: tag }))}
              defaultValue={request?.tags}
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
              required
              nothingFound="No tags available"
            />
          </div>

          <div>
            <TextInput
              label="Deadline"
              name="deadline"
              placeholder="MM/DD/YYYY"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
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
              required
              classNames={{
                input: "bg-gray-100",
                label: "text-lg font-medium text-gray-800",
                error: "text-red-500 mt-1",
              }}
            />
          </div>
          <div className="col-span-2 px-20">
            <Button
              type="submit"
              size="lg"
              fullWidth={true}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {request ? "Update" : "Post New Request"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
