// import React from "react";

// function CompletedRequests({posts}) {
//     return (
//         <div className="p-4">
//           <h2 className="text-2xl font-bold mb-4">Post History</h2>
//           {posts.length > 0 ? (
//             <ul className="space-y-4">
//               {posts.map((post, index) => (
//                 <li
//                   key={index}
//                   className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
//                 >
//                   <h3 className="text-lg font-semibold">{post.title}</h3>
//                   <p className="text-gray-600">{post.description}</p>
//                   <small className="text-gray-400">Date: {post.date}</small>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No posts available.</p>
//           )}
//         </div>
//       );
//     }

// export default CompletedRequests;

import React from "react";

function CompletedRequestsList({ requests }) {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Completed Requests</h1>

      {requests && Object.keys(requests).length > 0 ? (
        <ul className="space-y-6">
          {Object.entries(requests).map(
            ([key, request]) =>
              request["isFulfilled"] && ( // only show fulfilled requests
                <li
                  key={key}
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                >
                  {/* title and badge */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {request.title}
                    </h2>
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                      Completed
                    </span>
                  </div>

                  {/* request description */}
                  <p className="text-gray-700 mb-4">{request.description}</p>

                  {/* details */}
                  <div className="space-y-2 text-sm text-gray-500">
                    {/* location */}
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

                    {/* compensation */}
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

                    {/* completed on */}
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
                      Completed on:{" "}
                      {new Date(request.timestamp).toLocaleString()}
                    </div>
                  </div>
                </li>
              )
          )}
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
