import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { getComicsByIds } from "../../api";
import type { Character } from "../../types";
import { getFormattedDate } from "../../helpers";
import { charactersImages } from "../../constants";
import { Loader } from "../Loader/Loader";

interface CharacterDetailsProps {
  character: Character;
}

export const CharacterDetails = ({ character }: CharacterDetailsProps) => {
  const { id, name, description, modified, comics } = character;

  const ids = comics.items.map(({ resourceURI }) => resourceURI.split("/")[6]);

  const { data: fetchedComics, isLoading } = useQuery(
    ["comics", ids],
    () => getComicsByIds(ids),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
  const formattedModified = getFormattedDate(modified);

  return (
    <>
      <div className="lg:flex lg:gap-[30px]">
        <img
          src={charactersImages[id]}
          alt={name}
          width={295}
          height={387}
          className="mx-auto mb-[16px] h-[387px] rounded-[8px] object-cover md:h-[445px] md:w-[332px] lg:m-0 lg:h-[610px] lg:w-[400px]"
        />
        <div className="scrollbar max-h-[35dvh] rounded-[8px] bg-[#171717] px-[16px] py-[32px] md:max-h-[28dvh] lg:max-h-[610px] lg:w-[530px]">
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
            <div className="relative">
              <h3 className="mb-[16px] text-[18px] font-medium leading-[1.33] tracking-[-0.02em] md:text-[24px] md:leading-[1]">
                List of comics
              </h3>
              <ul className="flex flex-col gap-[32px] md:flex-row md:flex-wrap md:gap-x-[18px]">
                {fetchedComics?.map((comic) => (
                  <li key={comic.id} className="group md:w-[150px]">
                    <Link
                      to={comic.urls[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="mb-[16px] size-[263px] overflow-hidden rounded-[8px] md:h-[200px] md:w-[154px]">
                        <img
                          src={
                            comic.thumbnail.path +
                            "." +
                            comic.thumbnail.extension
                          }
                          alt={comic.title}
                          width={263}
                          height={263}
                          className="size-full rounded-[8px] object-cover transition duration-500 group-hover:scale-110 group-focus-visible:scale-110"
                        />
                      </div>
                      <h4 className="mb-[4px] text-[14px] font-medium leading-[1.29] tracking-[-0.02em]">
                        {comic.title.replace(/([#]).*/, "")}
                      </h4>
                      <p className="text-[12px] leading-[1.17] text-[#fafafa7f]">
                        {comic.creators.items.find(
                          (item) => item.role === "writer"
                        )?.name || "Author"}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              {isLoading && <Loader />}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
