import { Link } from "react-router-dom";
import { useState } from "react";

import { HeroSlider } from "../components";

const Home = () => {
  const [activeBgColor, setActiveBgColor] = useState("#34387f");

  return (
    <section className="container py-6 md:pt-[48px] lg:pt-[114px]">
      <div className="relative lg:flex lg:gap-[134px]">
        {" "}
        <div className="mb-10 md:mb-[32px] lg:w-[538px]">
          <p className="mb-[14px] uppercase leading-[1.29] text-[#ffffffb2] md:mb-4 md:text-[18px] md:leading-[1.6]">
            Web-based platform
          </p>
          <h1 className="mb-4 text-[44px] font-medium leading-[1] tracking-[-0.02em] md:mb-[18px] md:text-[80px]">
            Marvelous Adventures
          </h1>
          <p className="mb-5 leading-[1.29] md:mb-8 md:w-[473px] md:text-[16px] md:leading-[1.12] lg:w-full">
            is a web-based platform that provides an immersive experience for
            users to explore and discover a vast collection of Marvel characters
            and comics. Start exploring the Marvelous Adventures now by visiting
            our Characters and Comics sections and discover your new favorites
            today.
          </p>
          <Link
            to="/characters"
            style={{ backgroundColor: activeBgColor }}
            className={`flex h-[36px] w-[142px] items-center justify-center rounded-[1000px] px-5 py-2 text-center text-[12px] font-medium uppercase leading-[1.33] transition duration-500 md:h-[42px] md:w-[167px] md:text-[14px] md:leading-[1.29]`}
          >
            All characters
          </Link>
        </div>
        <HeroSlider setActiveBgColor={setActiveBgColor} />
      </div>
    </section>
  );
};

export default Home;
