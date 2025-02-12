import React from "react";
import {
  MultiSelect,
  NumberInput,
  Autocomplete,
  Switch,
  Select,
} from "@mantine/core";
import { IconSearch, IconArrowUp, IconArrowDown } from "@tabler/icons-react";

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
  isOpen,
  toggleBar,
}) => {
  return (
    <>
      <div
        className={`hidden lg:flex p-4 border-l border-gray-300 w-60 min-w-60 h-window flex-col`}
      >
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
          data={[
            "Buy",
            "Sell",
            "Borrow",
            "Transportation",
            "Cleaning",
            "Other",
          ]}
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
      </div>

      {/* version for small screens */}
      <div
        className={`fixed z-50 top-0 right-0 h-full w-60 bg-white shadow-lg border-l border-gray-300 p-4 flex-col transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Autocomplete
          className=""
          placeholder="Search requests"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          data={[]}
          value={searchQuery}
          onChange={setSearchQuery}
          mb="md"
        />

        <div className="flex flex-row justify-between items-center">
          <p className="font-lato font-bold">Filter Requests</p>
          <button
            onClick={toggleBar}
            className="text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>
        <MultiSelect
          label="Tags"
          placeholder="Select tags"
          data={[
            "Buy",
            "Sell",
            "Borrow",
            "Transportation",
            "Cleaning",
            "Other",
          ]}
          value={selectedTags}
          onChange={setSelectedTags}
          clearable
          searchable
          mb="md"
        />

        {/* min compensation input */}
        <NumberInput
          label="Min Compensation"
          placeholder="Enter minimum"
          value={minCompensation}
          onChange={(value) => setMinCompensation(value || 0)}
          min={0}
          mb="md"
        />

        {/* max compensation input */}
        <NumberInput
          label="Max Compensation"
          placeholder="Enter maximum"
          value={maxCompensation}
          onChange={(value) => setMaxCompensation(value || Infinity)}
          min={0}
          mb="md"
        />

        <p className="font-lato font-bold">Sort Requests</p>
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
      </div>
    </>
  );
};

export default FilterSortBar;
