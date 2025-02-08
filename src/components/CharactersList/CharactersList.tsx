import { CharactersListItem } from "./CharactersListItem";

import type { Character } from "../../types";

interface CharactersListProps {
  characters: Character[];
}

export const CharactersList = ({ characters }: CharactersListProps) => {
  return (
    <ul className="mb-[40px] flex flex-wrap gap-x-[16px] gap-y-[40px] md:mb-[64px] md:gap-[32px] lg:gap-x-[16px] lg:gap-y-[64px]">
      {characters.map((character) => (
        <CharactersListItem key={character.id} character={character} />
      ))}
    </ul>
  );
};
