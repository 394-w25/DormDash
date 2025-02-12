import { useDbData } from "../../utilities/firebase.js";
import { getRequests } from "../../utilities/request.js";
import Request from "./Request.jsx";
import { Burger } from "@mantine/core";

const Posts = ({
  selectedTags,
  minCompensation,
  maxCompensation,
  searchQuery,
  sortField,
  sortOrder,
  hideExpired,
  toggleBar,
}) => {
  const [data, error] = useDbData("/");

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  const allRequests = getRequests(data, {});

  // Filter requests based on lifted state
  const filteredRequests = allRequests.filter((request) => {
    // first filter through tags
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => request.tags.includes(tag));
    // then filter through compensation range
    const matchesCompensation =
      request.compensation >= minCompensation &&
      (maxCompensation === "" || request.compensation <= maxCompensation);
    // then filter through title/desciption/user/location if user used search
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location.toLowerCase().includes(searchQuery.toLowerCase());

    // then filter out expired postings if user selected the option
    const currentTime = Date.now();
    const notExpired = !request.deadline || request.deadline > currentTime;

    return (
      matchesTags &&
      matchesCompensation &&
      !request.isFulfilled &&
      matchesSearch &&
      notExpired
    );
  });

  // sort the posts for display
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    const field = sortField === "compensation" ? "compensation" : "timestamp";
    const orderMultiplier = sortOrder === "asc" ? 1 : -1;
    return (a[field] - b[field]) * orderMultiplier;
  });

  // all the tags that currently exist in the database
  const allTags = [...new Set(allRequests.flatMap((request) => request.tags))];

  return (
    <div className="flex flex-col flex-1 mx-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-lato text-start text-2xl font-bold py-4">Home</h1>
        <Burger
          onClick={toggleBar}
          size="sm"
          className="flex lg:hidden items-center justify-center"
        />
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sortedRequests.map((request, idx) => (
          <Request key={idx} request={request} />
        ))}
      </section>
    </div>
  );
};

export default Posts;
