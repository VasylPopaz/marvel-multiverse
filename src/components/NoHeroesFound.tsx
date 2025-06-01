import { noResultsImg1x, noResultsImg2x } from "../assets";

export const NoHeroesFound = () => {
  return (
    <div className="container relative py-16">
      <img
        srcSet={`${noResultsImg1x} 1x, ${noResultsImg2x} 2x`}
        src={noResultsImg1x}
        alt="No results found"
        width={267}
        height={152}
        className="mx-auto md:h-[221px] md:w-[375px]"
      />
      <h2 className="absolute left-1/2 top-1/2 max-w-[200px] -translate-x-1/2 -translate-y-1/2 text-[18px] font-medium leading-[1.33] tracking-[-0.02em] md:text-[24px] md:leading-[1.17]">
        Try looking for something else..
      </h2>
    </div>
  );
};
