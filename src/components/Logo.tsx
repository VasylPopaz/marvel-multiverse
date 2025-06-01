import { Link } from "react-router-dom";

import { Icon } from "../components";

export const Logo = () => {
  return (
    <Link
      to="/"
      className="inline-block py-1.5 transition duration-300 hover:scale-105 focus-visible:scale-105 active:scale-105"
    >
      <Icon
        id="logo"
        width={98}
        height={15}
        className="md:h-[31px] md:w-[202px]"
        aria-label="Marvel logo, link to homepage"
      />
    </Link>
  );
};
