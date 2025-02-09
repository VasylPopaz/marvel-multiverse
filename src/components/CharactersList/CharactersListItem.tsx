import { Modal, CharacterDetails } from "../../components";

import { useModal } from "../../hooks";
import { incognitoImg } from "../../assets";
import type { Character } from "../../types";
import { charactersImages } from "../../constants";

interface CharactersListItemProps {
  character: Character;
}

export const CharactersListItem = ({ character }: CharactersListItemProps) => {
  const [isOpen, toggleModal, handleBackdropClick, modalRef] = useModal();
  const heroImg = character.thumbnail.path.includes("image_not_available")
    ? incognitoImg
    : `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`;

  const characterImage = charactersImages[character.id] || heroImg;
  character.avatar = characterImage;

  return (
    <>
      <li
        className="group w-full cursor-pointer md:w-[336px] lg:w-[332px]"
        onClick={toggleModal}
      >
        <img
          src={characterImage}
          alt={character.name}
          width={335}
          height={445}
          className="mb-4 h-[445px] w-full rounded-[8px] object-cover transition duration-500 group-hover:scale-105 group-focus-visible:scale-105"
        />
        <h3 className="truncate text-[18px] font-medium leading-[1.33] tracking-[-0.02em] md:text-[24px]">
          {character.name}
        </h3>
      </li>
      {isOpen && (
        <Modal {...{ toggleModal, handleBackdropClick, modalRef }}>
          <CharacterDetails character={character} />
        </Modal>
      )}
    </>
  );
};
