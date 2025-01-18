import { useSearchRestraurant } from "@/apis/Restraurantapi";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { searchQuery } from "@/components/SearchBar";
import SearchInfo from "@/components/SearchInfo";
import SearchResultCard from "@/components/SearchResultCard";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
};

const SearchPage = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
  });
  const { city } = useParams();
  const { results, isLoading } = useSearchRestraurant(searchState, city);
  if (isLoading) {
    return <p>Loading..</p>;
  }
  if (!results?.data || !city) {
    return <span>Restraurant not found.</span>;
  }

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

  return (
    <div className="grid lg:grid-cols-[250px,1fr] gap-5 ">
      <div id="cuisines-lists">insert your cuisine lists.</div>

      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          placeholder="Search by restraurant name or cuisines"
          onSubmit={setSearchQuery}
          onReset={resetSearch}
          //   searchQuery={searchState.searchQuery}
        />

        <SearchInfo city={city} total={results.pagination.total} />

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
