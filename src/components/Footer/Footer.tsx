import { Link } from "react-router-dom";

import { Icon, Logo } from "../index";

import { socialLinks } from "../../constants";

export const Footer = () => {
  return (
    <footer className="after:bg-accentColor relative pb-[84px] pt-10 after:absolute after:bottom-0 after:left-0 after:flex after:h-[44px] after:w-full after:items-center after:justify-center after:text-[10px] after:leading-[1.2] after:tracking-[0.02em] after:text-[#fafafa66] after:content-['Privacy_Policy_Public_Offering_Agreement'] after:md:h-[54px] after:md:text-[14px] after:md:leading-[1.29]">
      <div className="container flex flex-wrap items-center gap-x-[158px] gap-y-[24px] md:justify-between md:gap-x-0">
        <Logo />
        <Link
          to="/characters"
          className="text-[14px] leading-[1.29] md:text-[16px] md:leading-[1.12]"
        >
          Characters
        </Link>
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
