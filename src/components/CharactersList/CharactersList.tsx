import { CharactersListItem } from "./CharactersListItem";

import type { Character } from "../../types";

interface CharactersListProps {
  characters: Character[];
}

export const CharactersList = ({ characters }: CharactersListProps) => {
  return (
    <ul className="mb-10 flex flex-wrap gap-x-4 gap-y-10 md:mb-16 md:gap-8 lg:gap-x-4 lg:gap-y-16">
      {characters.map((character) => (
        <CharactersListItem key={character.id} character={character} />
      ))}
    </ul>
  );
};
