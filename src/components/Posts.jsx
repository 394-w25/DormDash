import { useAuthState, useDbData } from "../utilities/firebase.js";
import Request from "./Request.jsx";
import UserRequest from "./UserRequest.jsx";

const Posts = () => {
  const [user] = useAuthState(); // current user
  const [data, error] = useDbData("/");
  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;
  const allRequests = Object.entries(data.users)
    .flatMap(([userId, user]) =>
      Object.entries(user.requests || {}).map(([requestId, request]) => ({
        userId,
        displayName: user.displayName,
        email: user.email,
        requestId,
        title: request.title,
        location: request.location,
        description: request.description,
        compensation: request.compensation,
        timestamp: request.timestamp,
        isFulfilled: request.isFulfilled || false,
      })),
    )
    .filter((request) => !request.isFulfilled) // Filter fulfilled posts here
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <>
      <h1 className="text-center text-7xl font-black py-12">Posts</h1>
      <section className="mx-auto w-1/2 gap-8 grid [grid-template-columns:_repeat(auto-fit,_minmax(400px,_1fr))]">
        {allRequests.map((request, idx) =>
          request.userId === user?.uid ? (
            <UserRequest key={idx} request={request} user={user} />
          ) : (
            <Request key={idx} request={request} />
          ),
        )}
      </section>
    </>
  );
};

export default Posts;
