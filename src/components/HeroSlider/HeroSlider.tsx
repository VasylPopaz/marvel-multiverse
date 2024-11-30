import clsx from "clsx";

import { Icon } from "../index";

import { heroes } from "../../constants";
import { useHeroSlider } from "../../hooks";
import { FC } from "react";

interface HeroSliderProps {
  setActiveBgColor: (color: string) => void;
}

export const HeroSlider: FC<HeroSliderProps> = ({ setActiveBgColor }) => {
  const { activeItem, onChangeActiveItem, listStyles, getBgImage, isTablet } =
    useHeroSlider(setActiveBgColor);

  return (
    <div className="h-[740px] w-full overflow-hidden md:h-[645px] lg:mt-[-210px] lg:h-[740px] lg:w-[736px] lg:shrink-0 lg:pt-[210px]">
      <ul
        style={listStyles}
        className="flex gap-[50px] transition duration-500 md:gap-3 lg:flex-col lg:gap-[220px]"
      >
        {heroes.map(
          ({ title, description, images, bgImages, colors }, index) => (
            <li key={index} className={`w-[335px] md:w-auto lg:w-[736px]`}>
              <div className="relative md:flex md:flex-wrap md:gap-x-[32px] lg:-mr-8">
                <picture>
                  <source
                    media="(min-width:1440px)"
                    srcSet={`${images.desk[0]} 1x, ${images.desk[1]} 2x`}
                    type="image/webp"
                    width={352}
                    height={540}
                  />
                  <source
                    media="(min-width:768px)"
                    srcSet={`${images.tab[0]} 1x, ${images.tab[1]} 2x`}
                    type="image/webp"
                    width={336}
                    height={540}
                  />

                  <source
                    media="(max-width:767.98px)"
                    srcSet={`${images.mob[0]} 1x, ${images.mob[1]} 2x`}
                    type="image/webp"
                    width={190}
                    height={256}
                  />
                  <img
                    className="mb-5 rounded-[4px] md:mb-0 md:mt-[80px] lg:mt-[-10px]"
                    src={images.desk[0]}
                    alt={title}
                    width={352}
                    height={540}
                  />
                </picture>

                <div
                  className={clsx(
                    "custom-blur relative mb-[14px] ml-auto h-[256px] w-[190px] rounded-[4px] bg-[#171717] md:m-0 md:h-[540px] md:w-[336px] lg:mt-[-210px] lg:h-[540px] lg:w-[352px]",
                    {
                      "after:bg-pantherBlurColor": activeItem === 0,
                      "after:bg-spiderManBlurColor": activeItem === 1,
                      "after:bg-hulkBlurColor": activeItem === 2,
                    }
                  )}
                  style={{
                    backgroundImage: getBgImage(bgImages),
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `center ${isTablet && "top 100px"}`,
                    backgroundSize: "100%",
                  }}
                >
                  <div
                    className="absolute bottom-[14px] left-[14px] z-[1] flex h-[80px] w-[80px] items-center justify-center rounded-full md:bottom-[16px] md:left-[16px] md:h-[144px] md:w-[144px]"
                    style={{
                      background: `${colors.gradient}`,
                    }}
                  >
                    <span className="px-3 text-[12px] font-medium uppercase leading-[1.17] tracking-[-0.02em] md:px-[18px] md:text-[24px] md:leading-[1]">
                      {" "}
                      {title}
                    </span>
                  </div>
                  <Icon
                    id="arrow"
                    style={{
                      fill: `${colors.primary}`,
                      stroke: `${colors.primary}`,
                    }}
                    className={`absolute bottom-4 right-4 hidden h-[32px] w-[32px] md:block`}
                  />
                </div>
                <div className="relative bottom-0 right-0 ml-auto flex w-[190px] gap-[14px] pt-4 text-[12px] leading-[1.17] tracking-[-0.02em] md:mt-[-63px] md:w-[336px] md:gap-[54px] lg:absolute lg:bottom-[81px] lg:right-[32px] lg:w-[320px] lg:gap-[59px]">
                  <Icon
                    id="line-triangle"
                    className="absolute left-0 top-[-5px] h-[6px] w-[190px] fill-[#fafafa26] md:h-[11px] md:w-[336px] lg:w-[320px]"
                  />
                  <p>Characters</p>
                  <p className="text-[#fafafa7f;]">{description}</p>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
      <ul className="absolute bottom-[-10px] right-1/2 z-[1] flex h-[4px] translate-x-1/2 justify-center gap-[14px] md:bottom-[-40px] lg:bottom-[50%] lg:left-[42%] lg:w-[4px] lg:translate-x-0 lg:flex-col">
        {heroes.map((_, index) => (
          <li key={index}>
            <button
              type="button"
              style={{
                backgroundColor: `${index === activeItem ? heroes[index].colors.primary : ""}`,
              }}
              className={`h-[4px] w-[72px] bg-[#171717cc] outline-none transition duration-500 hover:scale-105 focus-visible:scale-110 md:w-[100px] lg:h-[100px] lg:w-[4px]`}
              onClick={() => onChangeActiveItem(index)}
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
};
