import type { Comic } from "../types";
import { marvelAPI } from "./marvelAPI";
import { wrapErrorHandling } from "../helpers";

export const getComicById = wrapErrorHandling<Comic, string>(
  async (id: string) => {
    const {
      data: {
        data: { results },
      },
    } = await marvelAPI.get(`/comics/${id}`);

    return results[0];
  }
);

export const getComicsByIds = wrapErrorHandling<Comic[], string[]>(
  async (ids: string[]) => {
    const comicPromises = ids.map((id) => getComicById(id));

    const results = await Promise.allSettled(comicPromises);

    const comics = results
      .filter(
        (res): res is PromiseFulfilledResult<Comic | null> =>
          res.status === "fulfilled"
      )
      .map(({ value }) => value)
      .filter((comic): comic is Comic => comic !== null && comic !== undefined);

    return comics;
  }
);
