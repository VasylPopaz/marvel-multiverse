import { Link } from "react-router-dom";

const Characters = () => {
  return (
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
          With over 70,000 characters in the Marvel Multiverse, this is the most
          complete public listing in existence.
        </p>
        <Link
          to="/"
          className="ml-auto block h-[36px] w-[111px] rounded-full border border-[#fafafa7f] px-[20px] py-[10px] text-[12px] font-medium uppercase leading-[1.33] md:h-[42px] md:w-[131px] md:px-[24px] md:py-[12px] md:text-[14px] md:leading-[1.29]"
        >
          Back Home
        </Link>
      </div>
    </section>
  );
};

export default Characters;
