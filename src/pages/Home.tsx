import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { HeroSlider, Loader, RandomCharactersSlider } from "../components";

import { getRandomCharacters } from "../api";

const Home = () => {
  const { data: characters, isLoading } = useQuery(
    "randomCharacters",
    getRandomCharacters,
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <section
        id="hero"
        className="pb-[72px] pt-6 md:pb-[164px] md:pt-[54px] lg:pb-[168px] lg:pt-[116px]"
      >
        <div className="container relative lg:flex lg:gap-[134px]">
          <div className="mb-10 md:mb-[32px] lg:mb-0 lg:w-[538px]">
            <p className="mb-[14px] uppercase leading-[1.29] text-[#ffffffb2] md:mb-4 md:text-[18px] md:leading-[1.6]">
              Web-based platform
            </p>
            <h1 className="mb-4 text-[44px] font-medium leading-[1] tracking-[-0.02em] md:mb-[16px] md:text-[80px] lg:mb-[18px]">
              Marvelous Adventures
            </h1>
            <p className="mb-5 leading-[1.29] md:mb-8 md:w-[473px] md:text-[16px] md:leading-[1.12] lg:w-full">
              is a web-based platform that provides an immersive experience for
              users to explore and discover a vast collection of Marvel
              characters and comics. Start exploring the Marvelous Adventures
              now by visiting our Characters and Comics sections and discover
              your new favorites today.
            </p>
            <Link
              to="/characters"
              className="btn relative z-[1] flex h-[36px] w-[142px] items-center justify-center overflow-hidden rounded-[1000px] bg-activeItemColor px-5 py-2 text-center text-[12px] font-medium uppercase leading-[1.33] outline-none transition duration-500 hover:text-primaryBgColor focus-visible:text-primaryBgColor md:h-[42px] md:w-[167px] md:text-[14px] md:leading-[1.29]"
            >
              All characters
            </Link>
          </div>
          <HeroSlider />
        </div>
      </section>
      <section id="random-characters" className="pb-[80px] md:pb-[128px]">
        <div className="container">
          <h2 className="mb-[44px] text-[28px] font-medium uppercase leading-[1.14] md:text-[44px] md:leading-[1]">
            Random characters
          </h2>
          {characters?.length ? (
            <RandomCharactersSlider characters={characters} />
          ) : null}
        </div>
      </section>
      {isLoading && <Loader />}
    </>
  );
};

export default Home;
