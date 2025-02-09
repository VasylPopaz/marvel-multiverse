import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";

import { CharactersList, Loader, Pagination } from "../components";

import { getCharacters } from "../api";
import { useBreakpointValue } from "../hooks";

const Characters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const charactersSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const paramPage = Number(searchParams.get("page"));
    const validPage = isNaN(paramPage) || paramPage < 1 ? 1 : paramPage;

    if (paramPage !== page) {
      setPage(validPage);
      setSearchParams({ page: String(validPage) }, { replace: true });
    }
  }, [searchParams, page, setSearchParams]);

  const limit = useBreakpointValue([16, 8, 5]);

  const params = {
    limit,
    offset: (page === 1 ? 0 : page) * limit,
  };

  const { data, isFetching } = useQuery(
    ["characters", params],
    async () => {
      return getCharacters(params);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  const { totalPages, results: characters } = data ?? {
    totalPages: 0,
    characters: [],
  };

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setSearchParams({ page: String(totalPages) }, { replace: true });
      setPage(totalPages);
    }
  }, [page, totalPages, setSearchParams]);

  useEffect(() => {
    charactersSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  return (
    <>
      <section className="characters-hero-bg pb-[20px] pt-[150px] md:pb-[32px] md:pt-[188px] lg:pb-[64px]">
        <div className="container">
          {" "}
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
            className="btn relative z-[1] ml-auto flex h-[36px] w-[111px] items-center justify-center whitespace-nowrap rounded-full border border-[#fafafa7f] px-[20px] py-[10px] text-[12px] font-medium uppercase leading-[1.33] transition duration-500 hover:text-primaryBgColor focus-visible:text-primaryBgColor md:h-[42px] md:w-[131px] md:px-[24px] md:py-[12px] md:text-[14px] md:leading-[1.29]"
          >
            Back Home
          </Link>
        </div>
      </section>
      {characters ? (
        <section className="py-[64px]" ref={charactersSectionRef}>
          <div className="container">
            <CharactersList characters={characters} />
            <Pagination {...{ page, totalPages, handlePageChange }} />
          </div>
        </section>
      ) : null}
      {isFetching && <Loader />}
    </>
  );
};

export default Characters;
