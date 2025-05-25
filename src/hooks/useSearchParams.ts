import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

type SetSearchParamsOptions = {
  resetPage?: boolean;
  pageKey?: string;
};

export const useSearchParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const getSearchParam = (key: string): string => {
    return currentParams.get(key) || "";
  };

  const getAllParams = (): Record<string, string> => {
    const obj: Record<string, string> = {};
    currentParams.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  };

  const setSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(currentParams);
    params.set(key, value);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const setSearchParams = (
    values: Record<string, string | undefined>,
    options?: SetSearchParamsOptions
  ) => {
    const params = new URLSearchParams(currentParams);

    Object.entries(values).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    if (options?.resetPage) {
      params.set(options.pageKey || "page", "1");
    }

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const removeSearchParam = (key: string) => {
    const params = new URLSearchParams(currentParams);
    params.delete(key);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  return {
    getSearchParam,
    getAllParams,
    setSearchParam,
    setSearchParams,
    removeSearchParam,
  };
};
