import TagFilter from "./TagFilter";
import PaginationSelector from "./PaginationSelector";
import SearchBar from "./SearchBar";
import SortOptionDropdown from "./SortOptionDropdown";
import ItineraryResultsPage from "../itinerary/ItineraryResults";
import ItinerariesPage from "../itinerary/ItineraryPage";
import { useState } from "react";

const useSearchRestaurants = async(searchState) => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedTags", searchState.selectedTags.join(","));
    params.set("sortOption", searchState.sortOption);
    const response = await axios.get(`http://localhost:4000/search/`, {
      params: params,
    });
    if (!response.data) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
};
const SearchPage = () => {
  const [searchState, setSearchState] = useState({
    searchQuery: "",
    page: 1,
    selectedTags: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const results = useSearchRestaurants(searchState);
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
      <div id="Tags-list">
        <TagFilter
          selectedTags={searchState.selectedTags}
          onChange={setSelectedTags}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Itinerary Title"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
            <span>{results.pagination.total}</span>
          </div>
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {results.data?<ItineraryResultsPage itineraries={results.data}></ItineraryResultsPage>:<ItinerariesPage></ItinerariesPage>}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
export default SearchPage;