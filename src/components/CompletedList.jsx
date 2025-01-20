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
    <>
      {completedRequests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {completedRequests.map((request) => (
            <div
              key={`${request.userId}-${request.requestId}`}
              className="bg-gray-50 p-4 shadow-md rounded-md"
            >
              <Request request={request} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          You have no completed requests.
        </p>
      )}
    </>
  );
}

export default CompletedRequestsList;
