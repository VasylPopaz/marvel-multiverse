import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { heroes } from "../constants";

export const useHeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });
  const isRetina = useMediaQuery({
    query: "(min-resolution: 1.5dppx), (min-device-pixel-ratio: 2)",
  });

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--active-item-color",
      heroes[0].colors.primary
    );
  }, []);

  const handleHeroChange = (index: number) => {
    setActiveIndex(index);
    document.documentElement.style.setProperty(
      "--active-item-color",
      heroes[index].colors.primary
    );
  };

  const listStyles = {
    width: isTablet
      ? isDesktop
        ? "auto"
        : `calc(704px *  ${heroes.length} + 24px)`
      : `calc(335px *  ${heroes.length} + 100px)`,
    transform: isTablet
      ? isDesktop
        ? `translateY(-${activeIndex * 750}px)`
        : `translateX(-${activeIndex * 716}px)`
      : `translateX(-${activeIndex * 385}px)`,
  };

  const getBgImage = (bgImages: {
    mob: string[];
    tab: string[];
    desk: string[];
  }) => {
    if (isDesktop) {
      return isRetina ? `url(${bgImages.desk[1]})` : `url(${bgImages.desk[0]})`;
    } else if (isTablet) {
      return isRetina ? `url(${bgImages.tab[1]})` : `url(${bgImages.tab[0]})`;
    } else {
      return isRetina ? `url(${bgImages.mob[1]}` : `url(${bgImages.mob[0]})`;
    }
  };

  return {
    activeIndex,
    handleHeroChange,
    listStyles,
    getBgImage,
    isTablet,
  };
};
