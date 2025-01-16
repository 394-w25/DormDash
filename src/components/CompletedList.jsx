import { useDbData, useAuthState } from "../utilities/firebase.js";
import React from "react";
import UserRequest from "./UserRequest.jsx";

function CompletedRequestsList() {
  const [data, error] = useDbData("/");
  const [user] = useAuthState();

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  // Filter to show only current user's completed requests
  const completedRequests =
    data.users && user
      ? Object.entries(data.users)
          .filter(([userId]) => userId === user.uid)
          .flatMap(([userId, userData]) =>
            Object.entries(userData.requests || {})
              .filter(([, request]) => request.isFulfilled)
              .map(([requestId, request]) => ({
                userId,
                displayName: userData.displayName,
                email: userData.email,
                requestId,
                title: request.title,
                location: request.location,
                description: request.description,
                compensation: request.compensation,
                timestamp: request.timestamp,
                isFulfilled: request.isFulfilled,
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
              <UserRequest request={request} user={user} />
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
