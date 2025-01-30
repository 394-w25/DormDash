import { useAuthState, useDbData } from "../../utilities/firebase.js";
import React from "react";
import Request from "../Home/Request.jsx";

function CompletedRequestsList() {
  const [user] = useAuthState();
  const [data, error] = useDbData("/");

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  const completedRequests =
    user && data.users
      ? Object.entries(data.users[user.uid]?.requests || {})
          .filter(([, request]) => request.isFulfilled)
          .map(([requestId, request]) => ({
            ...request,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            userId: user.uid,
            requestId,
          }))
          .sort((a, b) => b.timestamp - a.timestamp)
      : [];

  return (
    <>
      {completedRequests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {completedRequests.map((request) => (
            <Request key={request.requestId} request={request} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-start">
          You have no completed requests.
        </p>
      )}
    </>
  );
}

export default CompletedRequestsList;
