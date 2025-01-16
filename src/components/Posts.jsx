import { useDbData } from "../utilities/firebase.js";
import Request from "./Request.jsx";

const Posts = () => {
  const [data, error] = useDbData("/");
  const [selectedTags, setSelectedTags] = useState([]);
  const [minCompensation, setMinCompensation] = useState(0);
  const [maxCompensation, setMaxCompensation] = useState(1000);

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
        tags: Object.entries(request.tags || {})
        .filter(([tag, value]) => value)
        .map(([tag]) => tag),
      })),
    )
    .sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp in descending order
  
    const filteredRequests = allRequests.filter((request) => {
      const matchedTags = selectedTags.every((tag) => request.tags.includes(tag));
      const matchedCompensations = request.compensation >= minCompensation && request.compensation <= maxCompensation;
      return matchedTags & matchedCompensations
    })

  return (
    <>
      <h1 className="text-center text-7xl font-black py-12">Posts</h1>
      <section className="mx-auto w-1/2 gap-8 grid [grid-template-columns:_repeat(auto-fit,_minmax(400px,_1fr))]">
        {allRequests.map((request, idx) => (
          <Request key={idx} request={request} />
        ))}
      </section>
    </>
  );
};

export default Posts;
