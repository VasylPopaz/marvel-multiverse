import { useQuery } from "react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import { getCharacters } from "../api";
import { useBreakpointValue, useSearchParams } from "../hooks";
import type { Character } from "../types";

export const CharacterSearchAutocomplete = () => {
  const [searchValue, setSearchValue] = useState("");
  const [hasUserInput, setHasUserInput] = useState(false);

  const hasMounted = useRef(false);

  const navigate = useNavigate();
  const location = useLocation();

  const limit = useBreakpointValue([16, 8, 5]);

  const { getSearchParam, removeSearchParam } = useSearchParams();

  const rawSearchName = getSearchParam("name");

  useEffect(() => {
    if (rawSearchName && !hasMounted.current) {
      setSearchValue(decodeURIComponent(rawSearchName));
      hasMounted.current = true;
    }
  }, [rawSearchName]);

  useEffect(() => {
    if (location.pathname !== "/characters") {
      setSearchValue("");
    }
  }, [location.pathname]);

  const params = useMemo(
    () => ({
      limit,
      offset: 1 * limit,
      ...(searchValue && { nameStartsWith: searchValue }),
    }),
    [limit, searchValue]
  );

  const { data, isFetching } = useQuery({
    queryKey: ["characters", searchValue],
    queryFn: () => getCharacters(params),
    enabled: !!searchValue && hasUserInput,
    keepPreviousData: true,
  });

  const handleOnSearch = (query: string) => {
    setSearchValue(query);
    setHasUserInput(true);
  };

  const handleOnSelect = (item: Character) => {
    navigate("/characters?page=1&name=" + item.name);
  };

  const handleClear = () => {
    setSearchValue("");
    removeSearchParam("name");
    setHasUserInput(false);
  };

  const formatResult = (item: Character) => {
    return (
      <div className="flex cursor-pointer flex-col gap-1 truncate text-primaryTextColor">
        {item.name}
      </div>
    );
  };

  const characters = data?.results || [];

  return (
    <ReactSearchAutocomplete
      items={hasUserInput ? characters : []}
      onSearch={handleOnSearch}
      onSelect={handleOnSelect}
      onClear={handleClear}
      formatResult={formatResult}
      resultStringKeyName="name"
      fuseOptions={{
        keys: ["name"],
        threshold: 0.3,
      }}
      className="search-autocomplete"
      placeholder="SEARCH"
      inputDebounce={400}
      maxResults={5}
      inputSearchString={searchValue}
      showNoResultsText={hasUserInput && !isFetching ? "No results" : ""}
    />
  );
};
