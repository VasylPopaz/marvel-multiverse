import { useCallback, useEffect, useState } from "react";

import type { Character } from "../../types";
import { charactersImages } from "../../constants";

interface RandomCharactersSliderProps {
  characters: Character[];
}

export const RandomCharactersSlider = ({
  characters,
}: RandomCharactersSliderProps) => {
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(
    null
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (characters) {
      setActiveCharacter(characters[0]);
    }
  }, [characters]);

  const handleSlideChange = useCallback(
    (index: number) => {
      if (characters[index]?.id !== activeCharacter?.id) {
        setIsAnimating(true);

        setTimeout(() => {
          setActiveCharacter(characters[index]);
          setActiveIndex(index);
          setIsAnimating(false);
        }, 400);
      }
    },
    [activeCharacter?.id, characters]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % characters.length;
      handleSlideChange(nextIndex);
    }, 3500);

    return () => clearInterval(interval);
  }, [activeIndex, characters, handleSlideChange]);

  const handleCharacterClick = (character: Character, index: number) => {
    if (activeCharacter?.id !== character.id) {
      handleSlideChange(index);
    }
  };

  const activeCharacterImage = activeCharacter
    ? charactersImages[activeCharacter.id] ||
      `${activeCharacter.thumbnail.path}/portrait_uncanny.${activeCharacter.thumbnail.extension}`
    : null;

  return (
    <div className="flex flex-col gap-[32px] lg:flex-row lg:items-center">
      <div className="group size-[335px] shrink-0 cursor-pointer overflow-hidden rounded-[8px] md:size-[704px] lg:h-[704px] lg:w-[496px]">
        <img
          key={activeCharacter?.id}
          src={activeCharacterImage || ""}
          alt={activeCharacter?.name || "Character"}
          width={335}
          height={335}
          className={`size-full object-cover transition duration-500 focus-visible:scale-110 group-hover:scale-110 ${isAnimating ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
        />
      </div>
      <ul className="flex flex-col gap-[32px]">
        {characters?.map((character, index) => (
          <li
            key={character.id}
            className={`border-[rgba(250, 250, 250, 0.2)] custom-border group relative cursor-pointer border-b pb-[32px] transition duration-100 ${
              character.id === activeCharacter?.id ? "text-[#34387f]" : ""
            }`}
            onClick={() => handleCharacterClick(character, index)}
          >
            <h3 className="mb-[14px] text-[18px] font-medium leading-[1.33] tracking-[-0.02em] md:text-[24px] md:leading-[1]">
              {character.name.replace(/([(/]).*/, "")}
            </h3>
            <p
              className="line-clamp-5 text-[14px] leading-[1.29] md:text-[16px] md:leading-[1.12]"
              title={character.description}
            >
              {character.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
