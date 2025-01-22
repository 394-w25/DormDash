import { useAuthState, useDbData } from "../../utilities/firebase.js";
import React from "react";
import Request from "../Request.jsx";
import { getRequests } from "../../utilities/request.js";

function CompletedRequests() {
  const [user] = useAuthState();
  const [data, error] = useDbData("/");

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  const completedRequests = getRequests(data, {
    userFilter: (userId) => userId === user.uid,
    requestFilter: (request) => request.isFulfilled,
  });
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

export default CompletedRequests;
