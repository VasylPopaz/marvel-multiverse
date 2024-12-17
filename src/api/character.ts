import { QueryFunctionContext } from "react-query";

import { marvelAPI } from "./marvelAPI";
import type { Character } from "../types";
import { charactersIds } from "../constants";
import { getRandomIds, wrapErrorHandling } from "../helpers";

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
    .filter((res) => res.status === "fulfilled")
    .map(({ value }) => value)
    .filter(
      (character): character is Character =>
        character !== null && character !== undefined
    );
  return characters;
});
