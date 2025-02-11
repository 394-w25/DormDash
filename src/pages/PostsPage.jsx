import { useState } from "react";
import { useAuthState } from "../utilities/firebase";
import SignIn from "./SignIn.jsx";
import Posts from "../components/Home/Posts.jsx";
import FilterSortBar from "../components/Home/FilterSortBar.jsx";

const PostsPage = () => {
  const [user] = useAuthState();

  // filtering
  const [selectedTags, setSelectedTags] = useState([]);
  const [minCompensation, setMinCompensation] = useState(0);
  const [maxCompensation, setMaxCompensation] = useState(1000);
  const [searchQuery, setSearchQuery] = useState("");
  const [hideExpired, setHideExpired] = useState(true);

  // sorting
  const [sortField, setSortField] = useState("postTime"); // default field
  const [sortOrder, setSortOrder] = useState("desc"); // default order

  return (
    <>
      {user ? (
        <div className="flex flex-row flex-1">
          <Posts
            selectedTags={selectedTags}
            minCompensation={minCompensation}
            maxCompensation={maxCompensation}
            searchQuery={searchQuery}
            sortField={sortField}
            sortOrder={sortOrder}
            hideExpired={hideExpired}
          />
          <FilterSortBar
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            minCompensation={minCompensation}
            setMinCompensation={setMinCompensation}
            maxCompensation={maxCompensation}
            setMaxCompensation={setMaxCompensation}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortField={sortField}
            setSortField={setSortField}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            hideExpired={hideExpired}
            setHideExpired={setHideExpired}
          />
        </div>
      ) : (
        <SignIn />
      )}
    </>
  );
};

export default PostsPage;
