import { useDbData } from "../utilities/firebase.js";
import Post from "./Post.jsx";

const Posts = () => {
  const [data, error] = useDbData("/");
  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;
  const allRequests = Object.entries(data.users).flatMap(([userId, user]) =>
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
    })),
  );

  return (
    <>
      <h1 className="text-center text-7xl font-black">Posts</h1>
      <section className="gap-4 grid [grid-template-columns:_repeat(auto-fit,_minmax(500px,_1fr))]">
        {allRequests.map((request, idx) => (
          <Post key={idx} request={request} />
        ))}
      </section>
    </>
  );
};

export default Posts;
