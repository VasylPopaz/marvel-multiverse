import { useMediaQuery } from "react-responsive";

type BreakpointValue<T> = [T, T, T];

export const useBreakpointValue = <T>(values: BreakpointValue<T>): T => {
  const isDesktop = useMediaQuery({ minWidth: 1440 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439.98 });
  const isMobile = useMediaQuery({ maxWidth: 767.98 });

  if (isDesktop) return values[0];
  if (isTablet) return values[1];
  if (isMobile) return values[2];

  return values[2];
};
