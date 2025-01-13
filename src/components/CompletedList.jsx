import { useDbData } from "../utilities/firebase.js";
import React from "react";

function CompletedRequestsList({ requests }) {
  const [data, error] = useDbData("/");
  console.log("data", data);

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  const completedRequests = data.users
    ? Object.entries(data.users).flatMap(([userId, user]) =>
        Object.entries(user.requests || {})
          .filter(([, request]) => request.isFulfilled) // Only fulfilled requests
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
        Completed Requests
      </h1>

      {completedRequests.length > 0 ? (
        <ul className="space-y-6">
          {completedRequests.map((request) => (
            <li
              key={`${request.userId}-${request.requestId}`}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              {/* Title and Badge */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {request.title}
                </h2>
                <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                  Completed
                </span>
              </div>

              {/* Request Description */}
              <p className="text-gray-700 mb-4">{request.description}</p>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-500">
                {/* Location */}
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2c3.866 0 7 3.134 7 7 0 5.25-7 13-7 13S5 14.25 5 9c0-3.866 3.134-7 7-7z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11a2 2 0 100-4 2 2 0 000 4z"
                    />
                  </svg>
                  Location: {request.location}
                </div>

                {/* Compensation */}
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <text x="6" y="18" fontSize="20" fill="currentColor">
                      $
                    </text>
                  </svg>
                  Compensation: ${request.compensation}
                </div>

                {/* Completed On */}
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Completed on: {new Date(request.timestamp).toLocaleString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">
          No completed requests available.
        </p>
      )}
    </div>
  );
}

export default CompletedRequestsList;
