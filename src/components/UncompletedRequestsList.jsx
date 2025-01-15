import { useDbData } from "../utilities/firebase.js";
import React from "react";
import Request from "./Request.jsx";

function UncompletedRequestsList({ requests }) {
  const [data, error] = useDbData("/");
  console.log("data", data);

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  const uncompletedRequests = data.users
    ? Object.entries(data.users).flatMap(([userId, user]) =>
      Object.entries(user.requests || {})
        .filter(([, request]) => !request.isFulfilled) // Changed to show unfulfilled requests
        .map(([requestId, request]) => ({
          ...request,
          userId,
          requestId,
        })),
    )
    : [];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Active Requests
      </h1>

      {uncompletedRequests.length > 0 ? (
        <ul className="space-y-6">
          {uncompletedRequests.map((request) => (
            <li key={`${request.userId}-${request.requestId}`}>
              <Request request={request} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">
          No active requests available.
        </p>
      )}
    </div>
  );
}

export default UncompletedRequestsList;