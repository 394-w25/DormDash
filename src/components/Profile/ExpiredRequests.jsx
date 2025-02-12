import { useAuthState, useDbData } from "../../utilities/firebase.js";
import React from "react";
import Request from "../../components/Home/Request.jsx";
import { getRequests } from "../../utilities/request.js";

function ExpiredRequests() {
  const [user] = useAuthState();
  const [data, error] = useDbData("/");

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  const now = new Date();

  const completedRequests = getRequests(data, {
    userFilter: (userId) => userId === user.uid,
    requestFilter: (request) => request.deadline < now && !request.isFulfilled,
  });
  return (
    <>
      {completedRequests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {completedRequests.map((request) => (
            <Request
              key={`${request.userId}-${request.requestId}`}
              request={request}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-start">
          You have no expired requests.
        </p>
      )}
    </>
  );
}

export default ExpiredRequests;
