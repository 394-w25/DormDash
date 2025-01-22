import { useDbData, useAuthState } from "../utilities/firebase.js";
import React from "react";
import Request from "./Request.jsx";
import { getRequests } from "../utilities/request.js";

function ActiveRequests() {
  const [data, error] = useDbData("/");
  const [user] = useAuthState();

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  const activeRequests = getRequests(data, {
    userFilter: (userId) => userId === user.uid,
    requestFilter: (request) => !request.isFulfilled,
  });
  return (
<<<<<<<< HEAD:src/components/ActiveRequests.jsx
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        My Active Requests
      </h1>

      {activeRequests.length > 0 ? (
        <ul className="space-y-6">
          {activeRequests.map((request) => (
            <li key={`${request.userId}-${request.requestId}`}>
              <Request request={request} />
            </li>
========
    <>
      {myUncompletedRequests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {myUncompletedRequests.map((request) => (
            <Request request={request} />
>>>>>>>> master:src/components/UncompletedRequestsList.jsx
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-start">You have no active requests.</p>
      )}
    </>
  );
}

export default ActiveRequests;
