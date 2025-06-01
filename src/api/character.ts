import { QueryFunctionContext } from "react-query";
import { AxiosResponse } from "axios";

import { marvelAPI } from "./marvelAPI";
import { charactersIds } from "../constants";
import { getRandomIds, wrapErrorHandling } from "../helpers";
import type { Character, CharactersResponse } from "../types";

interface Params {
  limit: number;
  offset: number;
  nameStartsWith?: string;
  modifiedSince?: Date;
  orderBy?: string;
}

export const getCharacters = wrapErrorHandling<CharactersResponse, Params>(
  async (params) => {
    const {
      data: { data },
    } = await marvelAPI.get<AxiosResponse<CharactersResponse>>("/characters", {
      params,
    });

    return {
      ...data,
      totalPages: Math.floor(data.total / data.limit),
    };
  }
);

export const getCharacterById = wrapErrorHandling<Character, number>(
  async (id: number) => {
    const {
      data: {
        data: { results },
      },
    } = await marvelAPI.get(`/characters/${id}`);

    return results[0];
  }
);

export const getRandomCharacters = wrapErrorHandling<
  Character[],
  QueryFunctionContext
>(async () => {
  const randomIds = getRandomIds(charactersIds, 5);

  const characterPromises = randomIds.map((id) => getCharacterById(id));
  const results = await Promise.allSettled(characterPromises);

  const characters = results
    .filter(
      (res): res is PromiseFulfilledResult<Character | null> =>
        res.status === "fulfilled"
    )
    .map(({ value }) => value)
    .filter(
      (character): character is Character =>
        character !== null && character !== undefined
    );
  return characters;
});
