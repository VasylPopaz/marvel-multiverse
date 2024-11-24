import { Link } from "react-router-dom";

import { Icon } from "../index";

export const Logo = () => {
  return (
    <Link to="/" className="inline-block py-[6px]">
      <Icon
        id="logo"
        width={98}
        height={15}
        className="md:h-[31px] md:w-[202px]"
      />
    </Link>
  );
};
