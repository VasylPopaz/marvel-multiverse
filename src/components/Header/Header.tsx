import { Icon, Logo } from "../index";

export const Header = () => {
  return (
    <header className="py-5 md:py-6 lg:py-9">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="relative flex w-[108px] items-center md:w-[130px]">
          <Icon
            id="search"
            width={16}
            height={16}
            className="absolute left-[18px] top-1/2 -translate-y-1/2 stroke-white md:left-6 lg:h-[18px] lg:w-[18px]"
          />
          <input
            type="text"
            placeholder="Search"
            className="text-primaryTextColor placeholder:text-primaryTextColor hover:border-primaryTextColor focus-visible:border-primaryTextColor h-7 w-full rounded-[1000px] border border-[#fafafa4c] bg-transparent py-[6px] pl-[38px] pr-[18px] text-[12px] font-medium uppercase leading-[1.17] outline-none transition duration-300 placeholder:font-medium md:h-[42px] md:py-3 md:pl-[46px] md:pr-6 md:text-[14px] md:leading-[1.29]"
          />
        </div>
      </div>
    </header>
  );
};