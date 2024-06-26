import CuisineFilter from "./CuisineFilter";
import PaginationSelector from "./PaginationSelector";
import SearchBar, { SearchForm } from "./SearchBar";
import SortOptionDropdown from "./SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";
const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const { results, isLoading } = useSearchRestaurants(searchState, city);
  const setSortOption = (sortOption) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };
  const setSelectedCuisines = (selectedCuisines) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
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
  if (isLoading) {
    <span>Loading ...</span>;
  }
  if (!results?.data || !city) {
    return <span>No results found</span>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
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
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
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