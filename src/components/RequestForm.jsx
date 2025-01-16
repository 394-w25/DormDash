import { useState } from "react";
import { useDbUpdate, useAuthState } from "../utilities/firebase";

const RequestForm = () => {
  const [user] = useAuthState(); // current user
  const [updateData] = useDbUpdate(`users/${user?.uid}/requests`); // path to current user's requests
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    compensation: 0,
    tags: {
      cleaning: false,
      transportation: false,
      other: false,
    },
    additionalTags: "",
  });

  // here we update the saved form data - called whenever a user changes something in the form
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type == "checkbox") {
      setFormData((prev) => ({
        ...prev,
        tags: {
          ...prev.tags,
          [id]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  // handle the actual clicking of the submit button - authenticate, validate the data has been set right,
  // post to firebase
  const handleSubmit = () => {
    // validate that the user has filled out data correctly
    if (!formData.title || !formData.location || !formData.description) {
      alert("Please fill out all of the fields and select at least one tag.");
      return;
    }

    // build the request
    const requestData = {
      [`request_${Date.now()}`]: {
        title: formData.title,
        location: formData.location,
        description: formData.description,
        compensation: formData.compensation,
        timestamp: Date.now(),
        tags: formData.tags,
        additionalTags: formData.additionalTags.trim(),
      },
    };
    updateData(requestData);
  };

  return (
    <>
      <h1>Post a New Request</h1>
      <div>
        <div>
          Request Details
          <input
            type="text"
            name="Title"
            id="title"
            placeholder="Request"
            value={formData.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="Location"
            id="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="Body"
            id="description"
            placeholder="Request description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="Suggested Compensation"
            id="compensation"
            // defaultValue={0}
            value={formData.compensation}
            onChange={handleInputChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: 15,
          }}
        >
          Tags (please select atleast 1)
          <label>
            <input
              type="checkbox"
              id="cleaning"
              checked={formData.tags.cleaning}
              onChange={handleInputChange}
            />
            Cleaning
          </label>
          <label>
            <input
              type="checkbox"
              id="transportation"
              checked={formData.tags.transportation}
              onChange={handleInputChange}
            />
            Transportation
          </label>
          <label>
            <input
              type="checkbox"
              id="other"
              checked={formData.tags.other}
              onChange={handleInputChange}
            />
            Other
          </label>
          <input
            type="text"
            name="Additional Tags"
            id="additionalTags"
            placeholder="Additional tags"
            value={formData.additionalTags}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button onClick={handleSubmit}>Post</button>
    </>
  );
};

export default RequestForm;
