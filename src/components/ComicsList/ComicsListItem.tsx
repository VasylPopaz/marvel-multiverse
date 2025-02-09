import { Link } from "react-router-dom";

import { comicImg } from "../../assets";
import type { Comic } from "../../types";

interface ComicsListItemProps {
  comic: Comic;
}

export const ComicsListItem = ({ comic }: ComicsListItemProps) => {
  const { title, thumbnail, creators, urls } = comic;

  const comicImage = thumbnail.path.includes("image_not_available")
    ? comicImg
    : thumbnail.path + "." + thumbnail.extension;

  return (
    <li className="group md:w-[150px]">
      <Link to={urls[0].url} target="_blank" rel="noopener noreferrer">
        <div className="mb-[16px] size-[263px] overflow-hidden rounded-[8px] md:h-[200px] md:w-[154px]">
          <img
            src={comicImage}
            alt={title}
            width={263}
            height={263}
            loading="lazy"
            className="size-full rounded-[8px] object-cover transition duration-500 group-hover:scale-110 group-focus-visible:scale-110"
          />
        </div>
        <h4 className="mb-[4px] text-[14px] font-medium leading-[1.29] tracking-[-0.02em]">
          {title.replace(/([#]).*/, "")}
        </h4>
        <p className="text-[12px] leading-[1.17] text-[#fafafa7f]">
          {creators.items.find((item) => item.role === "writer")?.name ||
            "Author"}
        </p>
      </Link>
    </li>
  );
};
