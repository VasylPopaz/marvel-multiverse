import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import {
  CharactersList,
  Loader,
  NoHeroesFound,
  Pagination,
} from "../components";

import { getCharacters } from "../api";
import { useBreakpointValue, useSearchParams } from "../hooks";

const Characters = () => {
  const { getSearchParam, setSearchParam } = useSearchParams();
  const rawSearchName = getSearchParam("name");
  const rawPage = Number(getSearchParam("page"));

  const searchName = rawSearchName ? decodeURIComponent(rawSearchName) : "";
  const pageForUrl = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;
  const pageForBackend = pageForUrl - 1;
  const charactersSectionRef = useRef<HTMLDivElement>(null);

  const limit = useBreakpointValue([16, 8, 5]);

  const params = {
    limit,
    offset: pageForBackend * limit,
    ...(searchName && { nameStartsWith: searchName }),
  };

  const { data, isFetching } = useQuery({
    queryKey: ["characters", rawPage, rawSearchName],
    queryFn: () => {
      return getCharacters(params);
    },
    enabled: !!limit,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    charactersSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [rawPage]);

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
      <section className="characters-hero-bg pb-[20px] pt-[150px] md:pb-[32px] md:pt-[188px] lg:pb-[64px]">
        <div className="container">
          <p className="mb-[14px] uppercase leading-[1.29] text-[#ffffffb2] md:mb-[26px] md:text-[18px] md:leading-[1.6] lg:mb-[16px]">
            Web-based platform
          </p>
          <h1 className="mb-4 text-[60px] font-medium leading-[1] tracking-[-0.02em] md:mb-[16px] md:text-[128px] lg:mb-[18px] lg:text-[150px]">
            Characters
          </h1>
          <p className="mx-auto mb-[65px] text-[16px] leading-[1.25] tracking-[0.02em] md:mb-[188px] md:max-w-[469px] lg:mb-[145px] lg:ml-[88px] lg:max-w-[436px]">
            With over 70,000 characters in the Marvel Multiverse, this is the
            most complete public listing in existence.
          </p>
          <Link
            to="/"
            className="btn relative z-[1] ml-auto flex h-[36px] w-[111px] items-center justify-center overflow-hidden whitespace-nowrap rounded-full border border-[#fafafa7f] px-[20px] py-[10px] text-[12px] font-medium uppercase leading-[1.33] transition duration-500 hover:text-primaryBgColor focus-visible:text-primaryBgColor md:h-[42px] md:w-[131px] md:px-[24px] md:py-[12px] md:text-[14px] md:leading-[1.29]"
          >
            Back Home
          </Link>
        </div>
      </section>
      {characters && !isFetching ? (
        <section className="py-[64px]" ref={charactersSectionRef}>
          <div className="container">
            <CharactersList characters={characters} />
            <Pagination
              {...{ page: pageForUrl, totalPages, handlePageChange }}
            />
          </div>
        </section>
      ) : null}
      {!characters && !isFetching && (
        <section className="py-[64px]">
          <div className="container">
            <NoHeroesFound />
          </div>
        </section>
      )}
      {isFetching && <Loader />}
    </>
  );
};

export default Characters;
