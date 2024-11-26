import { Link } from "react-router-dom";

import { Icon, Logo } from "../index";

import { socialLinks } from "../../constants";

export const Footer = () => {
  return (
    <footer className="pb-[84px] pt-10">
      <div className="container flex flex-wrap items-center gap-x-[158px] gap-y-[24px] md:justify-between md:gap-x-0">
        <Logo />
        <p className="text-[14px] leading-[1.29] md:text-[16px] md:leading-[1.12]">
          Characters
        </p>
        <ul className="flex gap-[14px]">
          {socialLinks.map(({ link, icon }, index) => (
            <li className="group" key={index}>
              <Link
                to={link}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon id={icon} className="social-link-icon" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};