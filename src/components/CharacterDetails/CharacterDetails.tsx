import { charactersImages } from "../../constants";
import { getFormattedDate } from "../../helpers";
import type { Character } from "../../types";

interface CharacterDetailsProps {
  character: Character;
}

export const CharacterDetails = ({ character }: CharacterDetailsProps) => {
  console.log(character);
  const { id, name, description, modified, comics } = character;
  const formattedModified = getFormattedDate(modified);

  return (
    <div>
      <img
        src={charactersImages[id]}
        alt={name}
        width={295}
        height={387}
        className="mx-auto mb-[16px] h-[387px] rounded-[8px] object-cover md:h-[445px] md:w-[332px]"
      />
      <div className="scrollbar max-h-[35dvh] rounded-[8px] bg-[#171717] px-[16px] py-[32px] md:max-h-[28dvh]">
        <div className="mb-[32px]">
          <div className="mb-[16px] flex flex-col gap-[4px] md:flex-row md:items-center md:justify-between">
            <h3 className="text-[18px] font-medium leading-[1.33] tracking-[-0.02em] md:text-[24px] md:leading-[1]">
              {name.replace(/([(/]).*/, "")}
            </h3>
            <p className="leading-[1.29] text-[#fafafa7f]">
              {formattedModified}
            </p>
          </div>
          <p className="md:text-[16px] md:leading-[1.12]">{description}</p>
        </div>
        {comics.items.length ? (
          <div>
            <h3 className="mb-[16px] text-[18px] font-medium leading-[1.33] tracking-[-0.02em] md:text-[24px] md:leading-[1]">
              List of comics
            </h3>
            <ul className="flex flex-col gap-[32px] md:flex-row md:flex-wrap md:gap-x-[18px]">
              {comics.items.map((comic) => (
                <li
                  key={comic.resourceURI}
                  className="cursor-pointer md:w-[150px]"
                >
                  <img
                    src=""
                    alt="Alt"
                    width={263}
                    height={263}
                    className="object-cover md:h-[200px] md:w-[154px]"
                  />
                  <h4 className="mb-[4px] text-[14px] font-medium leading-[1.29] tracking-[-0.02em]">
                    {comic.name.replace(/([#]).*/, "")}
                  </h4>
                  <p className="text-[12px] leading-[1.17] text-[#fafafa7f]">
                    Author
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};
