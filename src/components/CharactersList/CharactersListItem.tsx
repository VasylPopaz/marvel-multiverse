import { incognitoImg } from "../../assets";
import { charactersImages } from "../../constants";
import type { Character } from "../../types";

interface CharactersListItemProps {
  character: Character;
}

export const CharactersListItem = ({ character }: CharactersListItemProps) => {
  const heroImg = character.thumbnail.path.includes("image_not_available")
    ? incognitoImg
    : `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`;

  const characterImage = charactersImages[character.id] || heroImg;

  return (
    <li className="w-full md:w-[336px] lg:w-[332px]">
      <img
        src={characterImage}
        alt={character.name}
        width={335}
        height={445}
        className="mb-4 h-[445px] w-full rounded-[8px] object-cover"
      />
      <h3 className="truncate text-[18px] font-medium leading-[1.33] tracking-[-0.02em] md:text-[24px]">
        {character.name}
      </h3>
    </li>
  );
};
