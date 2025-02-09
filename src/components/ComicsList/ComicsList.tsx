import { ComicsListItem } from "../../components";

import type { Comic } from "../../types";

interface ComicsListProps {
  comics: Comic[];
}

export const ComicsList = ({ comics }: ComicsListProps) => {
  return (
    <ul className="flex flex-col gap-[32px] md:flex-row md:flex-wrap md:gap-x-[18px]">
      {comics.map((comic) => (
        <ComicsListItem key={comic.id} comic={comic} />
      ))}
    </ul>
  );
};
