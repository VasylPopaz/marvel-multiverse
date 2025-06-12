import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import {
  CharactersList,
  Loader,
  NoHeroesFound,
  Pagination,
  Filters,
} from "../components";

import { getCharacters } from "../api";
import { useBreakpointValue, useSearchParams } from "../hooks";

const Characters = () => {
  const { getSearchParam, setSearchParam } = useSearchParams();
  const rawSearchName = getSearchParam("name");
  const rawPage = Number(getSearchParam("page"));
  const rawOrderBy = getSearchParam("orderBy");
  const rawModifiedSince = getSearchParam("modifiedSince");
  const rawComics = getSearchParam("comics");

  const searchName = rawSearchName ? decodeURIComponent(rawSearchName) : "";
  const pageForUrl = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;
  const pageForBackend = pageForUrl - 1;
  const orderBy = rawOrderBy ? decodeURIComponent(rawOrderBy) : "";
  const modifiedSince = rawModifiedSince ? new Date(rawModifiedSince) : null;

  const limit = useBreakpointValue([16, 8, 5]);

  const charactersSectionRef = useRef<HTMLDivElement>(null);

  const params = {
    limit,
    offset: pageForBackend * limit,
    ...(searchName && { nameStartsWith: searchName }),
    ...(orderBy && { orderBy }),
    ...(modifiedSince && { modifiedSince }),
    ...(rawComics && { comics: rawComics }),
  };

  const { data, isFetching } = useQuery({
    queryKey: [
      "characters",
      rawPage,
      rawSearchName,
      rawOrderBy,
      rawModifiedSince,
      rawComics,
    ],
    queryFn: () => {
      return getCharacters(params);
    },
    enabled: !!limit,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (charactersSectionRef.current && data?.results.length) {
      charactersSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [data?.results.length, rawPage]);

  const handlePageChange = (newPage: number) => {
    setSearchParam("page", String(newPage));
  };

  const characters = data?.results ?? [];
  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    if (!totalPages) return;

    if (data && pageForUrl > data.totalPages) {
      setSearchParam("page", String(data.totalPages));
    }
  }, [data, pageForUrl, setSearchParam, totalPages]);

  return (
    <>
      <section className="characters-hero-bg pb-5 pt-[150px] md:pb-[32px] md:pt-[188px] lg:pb-16">
        <div className="container">
          <p className="mb-3.5 uppercase leading-[1.29] text-[#ffffffb2] md:mb-[26px] md:text-[18px] md:leading-[1.6] lg:mb-4">
            Web-based platform
          </p>
          <h1 className="mb-4 text-[60px] font-medium leading-[1] tracking-[-0.02em] md:text-[128px] lg:mb-[18px] lg:text-[150px]">
            Characters
          </h1>
          <p className="mx-auto mb-[65px] text-[16px] leading-[1.25] tracking-[0.02em] md:mb-[188px] md:max-w-[469px] lg:mb-[145px] lg:ml-[88px] lg:max-w-[436px]">
            With over 70,000 characters in the Marvel Multiverse, this is the
            most complete public listing in existence.
          </p>
          <Link
            to="/"
            className="btn relative z-[1] ml-auto flex h-9 w-[111px] items-center justify-center overflow-hidden whitespace-nowrap rounded-full border border-[#fafafa7f] px-5 py-2.5 text-[12px] font-medium uppercase leading-[1.33] transition duration-500 hover:text-primaryBgColor focus-visible:text-primaryBgColor md:h-[42px] md:w-[131px] md:px-6 md:py-3 md:text-[14px] md:leading-[1.29]"
          >
            Back Home
          </Link>
        </div>
      </section>

      <section className="py-[64px]" ref={charactersSectionRef}>
        <div className="container">
          <Filters />
          {characters.length ? (
            <>
              {" "}
              <CharactersList characters={characters} />
              <Pagination
                {...{ page: pageForUrl, totalPages, handlePageChange }}
              />
            </>
          ) : null}
        </div>
      </section>
      {!characters.length && !isFetching && <NoHeroesFound />}
      {isFetching && <Loader />}
    </>
  );
};

export default Characters;
