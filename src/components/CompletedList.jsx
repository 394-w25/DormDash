import { useAuthState, useDbData } from "../utilities/firebase.js";
import React from "react";
import Request from "./Request.jsx";

function CompletedRequestsList() {
  const [user] = useAuthState();
  const [data, error] = useDbData("/");

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  const completedRequests = data.users
    ? Object.entries(data.users)
        .flatMap(([userId, user]) =>
          Object.entries(user.requests || {})
            .filter(([, request]) => request.isFulfilled) // Only fulfilled requests
            .map(([requestId, request]) => ({
              ...request,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              userId,
              requestId,
            })),
        )
        .sort((a, b) => b.timestamp - a.timestamp)
    : [];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        My Completed Requests
      </h1>

      {completedRequests.length > 0 ? (
        <ul className="space-y-6">
          {completedRequests.map((request) => (
            <li key={`${request.userId}-${request.requestId}`}>
              <Request request={request} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">
          You have no completed requests.
        </p>
      )}
    </div>
  );
}

export default CompletedRequestsList;
