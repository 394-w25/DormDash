import { useDbData } from "../utilities/firebase.js";

const Posts = () => {
  const [data, error] = useDbData("/");
  console.log(data);
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
    }
  )));

  return (
    <section className="requests-container">
      {allRequests.map((request) => (
            <div key ={request.requestId} className="requests">
              <h3>{request.title}</h3>
              <p>{request.location}</p>
              <p>Requested on: {new Date(request.timestamp).toLocaleString()}</p>
              <p>Possible Amount Paid: <strong>{request.compensation}</strong></p>
            </div>
          ))
      }
    </section>
  );
};

export default Posts;
