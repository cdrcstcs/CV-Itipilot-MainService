import TagFilter from "./TagFilter";
import PaginationSelector from "./PaginationSelector";
import SearchBar from "./SearchBar";
import SortOptionDropdown from "./SortOptionDropdown";
import ItineraryResultsPage from "../itinerary/ItineraryResults";
import { useEffect, useState } from "react";
import axios from "axios";

const useSearchRestaurants = async (searchState) => {
  const params = {
    searchQuery: searchState.searchQuery,
    page: searchState.page.toString(),
    selectedTags: searchState.selectedTags.join(","),
    sortOption: searchState.sortOption,
  };
  
  try {
    const response = await axios.get(`http://localhost:4000/search/`, {
      params: params,
    });
    if (!response.data) {
      throw new Error("Failed to get data");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const SearchPage = () => {
  const [searchState, setSearchState] = useState({
    searchQuery: "",
    page: 1,
    selectedTags: [],
    sortOption: "bestMatch",
  });
  const [results, setResults] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await useSearchRestaurants(searchState);
        setResults(data);
      } catch (error) {
        console.error("Error in fetchResults:", error);
      }
    };
    fetchResults();
  }, [searchState]);

  const setSortOption = (sortOption) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedTags = (selectedTags) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedTags,
      page: 1,
    }));
  };

  const setPage = (page) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div>
        <TagFilter
          selectedTags={searchState.selectedTags}
          onChange={setSelectedTags}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
        />
      </div>
      <div className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Itinerary Title"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <div className="text-black font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
            <span>{results?.pagination.total} results found</span>
          </div>
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {results && <ItineraryResultsPage itineraries={results.data}></ItineraryResultsPage>}
        {results && (
          <PaginationSelector
            page={results.pagination.page}
            pages={results.pagination.pages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
