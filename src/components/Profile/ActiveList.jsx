import { useDbData, useAuthState } from "../../utilities/firebase.js";
import React from "react";

import Request from "../Home/Request.jsx";

function ActiveList({ requests }) {
  const [data, error] = useDbData("/");
  const [user] = useAuthState();

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  // filter to only show current user's requests
  const myActive =
    data.users && user
      ? Object.entries(data.users)
          .filter(([userId]) => userId === user.uid) // current user's data
          .flatMap(([userId, userData]) =>
            Object.entries(userData.requests || {})
              .filter(([, request]) => !request.isFulfilled)
              .map(([requestId, request]) => ({
                ...request,
                photoURL: userData.photoURL,
                displayName: userData.displayName,
                email: userData.email,
                userId,
                requestId,
              })),
          )
      : [];

  return (
    <>
      {myActive.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {myActive.map((request) => (
            <Request key={request.requestId} request={request} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-start">You have no active requests.</p>
      )}
    </>
  );
}

export default ActiveList;
