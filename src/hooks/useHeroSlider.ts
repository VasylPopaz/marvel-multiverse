import { useState } from "react";
import { useMediaQuery } from "react-responsive";

import { heroes } from "../constants";

export const useHeroSlider = (setActiveBgColor: (color: string) => void) => {
  const [activeItem, setActiveItem] = useState<number>(0);

  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });
  const isRetina = useMediaQuery({
    query: "(min-resolution: 1.5dppx), (min-device-pixel-ratio: 2)",
  });

  const onChangeActiveItem = (index: number) => {
    setActiveItem(index);
    setActiveBgColor(heroes[index].colors.primary);
  };

  const listStyles = {
    width: isTablet
      ? isDesktop
        ? "auto"
        : `calc(704px *  ${heroes.length} + 24px)`
      : `calc(335px *  ${heroes.length} + 100px)`,
    transform: isTablet
      ? isDesktop
        ? `translateY(-${activeItem * 750}px)`
        : `translateX(-${activeItem * 716}px)`
      : `translateX(-${activeItem * 385}px)`,
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
    activeItem,
    onChangeActiveItem,
    listStyles,
    getBgImage,
    isTablet,
  };
};
