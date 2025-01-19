import { useSearchRestraurant } from "@/apis/Restraurantapi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { searchQuery } from "@/components/SearchBar";
import SearchInfo from "@/components/SearchInfo";
import SearchResultCard from "@/components/SearchResultCard";
import SortOptionsDropdown from "@/components/SortOptionsDropdown.tsx";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { city } = useParams();
  const { results, isLoading } = useSearchRestraurant(searchState, city);
  if (isLoading) {
    return <p>Loading..</p>;
  }
  if (!results?.data || !city) {
    return <span>Restraurant not found.</span>;
  }

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prev) => ({
      ...prev,
      selectedCuisines,
      page: 1,
    }));
  };

  const setSearchQuery = (searchFormData: searchQuery) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prev) => ({
      ...prev,
      page,
    }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prev) => ({
      ...prev,
      sortOption,
      page: 1,
    }));
  };

  return (
    <div className="grid lg:grid-cols-[250px,1fr] gap-5 ">
      <div id="cuisines-lists">
        <CuisineFilter
          isExpanded={isExpanded}
          onExpandClick={() => setIsExpanded((prev) => !prev)}
          onChange={setSelectedCuisines}
          selectedCuisine={searchState.selectedCuisines}
        />
      </div>

      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          placeholder="Search by restraurant name or cuisines"
          onSubmit={setSearchQuery}
          onReset={resetSearch}
          //   searchQuery={searchState.searchQuery}
        />
        <div className="flex justify-between">
          <SearchInfo city={city} total={results.pagination.total} />
          <SortOptionsDropdown
            onChange={setSortOption}
            sortOption={searchState.sortOption}
          />
        </div>

        {results.data.map((restraurant) => (
          <SearchResultCard restraurant={restraurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
