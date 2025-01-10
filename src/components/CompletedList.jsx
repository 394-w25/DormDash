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
      <h1 className="text-2xl font-bold mb-4">Completed Requests </h1>

      {requests && Object.keys(requests).length > 0 ? (
        <ul className="space-y-4">
          {Object.entries(requests).map(
            ([key, request]) =>
              request["isFulfilled"] && ( // Only show fulfilled requests
                <li
                  key={key}
                  className="p-4 border rounded-lg shadow-sm bg-green-50 hover:shadow-md transition-shadow"
                >
                  <h2 className="text-lg font-semibold">{request.title}</h2>
                  <p className="text-gray-700">{request.description}</p>
                  <p className="text-gray-500 text-sm">
                    Location: {request.location}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Compensation: ${request.compensation}
                  </p>
                  <small className="text-gray-400">
                    Completed on: {new Date(request.timestamp).toLocaleString()}
                  </small>
                </li>
              ),
          )}
        </ul>
      ) : (
        <p className="text-gray-500">No completed requests available.</p>
      )}
    </div>
  );
}

export default CompletedRequestsList;
