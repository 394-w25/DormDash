import React from "react";
import {
  MultiSelect,
  Paper,
  NumberInput,
  Autocomplete,
  Switch,
  Select,
} from "@mantine/core";
import { IconSearch, IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import { useDbData } from "../../utilities/firebase.js";
import { getRequests } from "../../utilities/request.js";

const FilterSortBar = ({
  selectedTags,
  setSelectedTags,
  minCompensation,
  setMinCompensation,
  maxCompensation,
  setMaxCompensation,
  searchQuery,
  setSearchQuery,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}) => {
  //   const [data, error] = useDbData("/");

  //   if (error) return <h1>Error loading data: {error.toString()}</h1>;
  //   if (data === undefined) return <h1>Loading data...</h1>;
  //   if (!data) return <h1>No data found</h1>;

  //   const allRequests = getRequests(data, {});
  //   const allTags = [...new Set(allRequests.flatMap((request) => request.tags))];

  return (
    <Paper className="p-4 ml-4 border-l border-gray-300 w-60 min-w-60 h-window flex-col">
      <Autocomplete
        className=""
        placeholder="Search requests"
        leftSection={<IconSearch size={16} stroke={1.5} />}
        data={[]}
        visibleFrom="xs"
        value={searchQuery}
        onChange={setSearchQuery}
        mb="md"
      />

      <p className="font-lato font-bold">Filter Requests</p>
      {/* MultiSelect for Tags */}
      <MultiSelect
        label="Tags"
        placeholder="Select tags"
        data={["Buy", "Sell", "Borrow", "Transportation", "Cleaning", "Other"]}
        value={selectedTags}
        onChange={setSelectedTags}
        clearable
        searchable
        mb="md"
      />

      {/* NumberInput for Min Compensation */}
      <NumberInput
        label="Min Compensation"
        placeholder="Enter minimum"
        value={minCompensation}
        onChange={(value) => setMinCompensation(value || 0)}
        min={0}
        mb="md"
      />

      {/* NumberInput for Max Compensation */}
      <NumberInput
        label="Max Compensation"
        placeholder="Enter maximum"
        value={maxCompensation}
        onChange={(value) => setMaxCompensation(value || Infinity)}
        min={0}
        mb="md"
      />

      <p className="font-lato font-bold">Sort Requests</p>
      {/* Sort Field Select */}
      <Select
        label="Sort By"
        placeholder="Select a field"
        value={sortField}
        onChange={setSortField}
        data={[
          { value: "postTime", label: "Post Time" },
          { value: "compensation", label: "Compensation" },
        ]}
        mb="md"
      />

      {/* Sort Order Switch */}
      <Switch
        label={`Order: ${sortOrder === "asc" ? "Ascending" : "Descending"}`}
        checked={sortOrder === "desc"}
        onChange={(event) =>
          setSortOrder(event.currentTarget.checked ? "desc" : "asc")
        }
        mb="md"
        size="md"
        color="dark.4"
        onLabel={
          <IconArrowDown
            size={16}
            stroke={2.5}
            color="var(--mantine-color-green-4)"
          />
        }
        offLabel={
          <IconArrowUp
            size={16}
            stroke={2.5}
            color="var(--mantine-color-blue-6)"
          />
        }
      />
    </Paper>
  );
};

export default FilterSortBar;
