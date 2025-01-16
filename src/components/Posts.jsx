import { useDbData } from "../utilities/firebase.js";
import Request from "./Request.jsx";
import { useState } from "react";

const Posts = () => {
  const [data, error] = useDbData("/");
  const [selectedTags, setSelectedTags] = useState([]);
  const [minCompensation, setMinCompensation] = useState(0);
  const [maxCompensation, setMaxCompensation] = useState(100);

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  const allRequests = Object.entries(data.users)
    .flatMap(([userId, user]) =>
      Object.entries(user.requests || {}).map(([requestId, request]) => ({
        userId,
        displayName: user.displayName,
        email: user.email,
        requestId,
        title: request.title,
        location: request.location,
        description: request.description,
        compensation: request.compensation || 0,
        timestamp: request.timestamp,
        isFulfilled: request.isFulfilled || false,
        tags: Object.entries(request.tags || {})
          .filter(([tag, value]) => value) // Extract tags with true values
          .map(([tag]) => tag),
      }))
    )
    .sort((a, b) => b.timestamp - a.timestamp);

  // Filter requests based on selected tags and compensation range
  const filteredRequests = allRequests.filter((request) => {
    const matchesTags =
      selectedTags.length === 0 || selectedTags.every((tag) => request.tags.includes(tag));
    const matchesCompensation =
      request.compensation >= minCompensation &&
      (maxCompensation === "" || request.compensation <= maxCompensation);
    return matchesTags && matchesCompensation && !request.isFulfilled;
  });

  // Extract unique tags from all requests
  const allTags = [...new Set(allRequests.flatMap((request) => request.tags))];

  // Toggle a tag's selection
  const toggleTag = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag) // Remove the tag if already selected
        : [...prevSelectedTags, tag] // Add the tag if not already selected
    );
  };

  return (
    <>
      <h1 className="text-center text-7xl font-black py-12">Posts</h1>

      {/* Filter Section */}
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-12 mx-auto w-3/4 max-w-5xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Filter Options</h2>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {allTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                selectedTags.includes(tag)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Compensation */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="flex flex-col items-center">
            <label htmlFor="minCompensation" className="text-sm font-semibold mb-2">
              Min Compensation:
            </label>
            <input
              type="number"
              id="minCompensation"
              value={minCompensation}
              onChange={(e) => setMinCompensation(Number(e.target.value) || 0)}
              className="border rounded-md px-3 py-1 w-32 text-center"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="maxCompensation" className="text-sm font-semibold mb-2">
              Max Compensation:
            </label>
            <input
              type="number"
              id="maxCompensation"
              value={maxCompensation}
              onChange={(e) => setMaxCompensation(Number(e.target.value) || "")}
              className="border rounded-md px-3 py-1 w-32 text-center"
            />
          </div>
        </div>
      </div>

      {/* Filtered Posts */}
      <section className="mx-auto w-3/4 gap-8 grid [grid-template-columns:_repeat(auto-fit,_minmax(400px,_1fr))]">
        {filteredRequests.map((request, idx) => (
          <Request key={idx} request={request} />
        ))}
      </section>
    </>
  );
};

export default Posts;
