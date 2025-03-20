import { RefObject, useEffect, useRef, useState } from "react";

import { Icon } from "../components";

import { sortOptions } from "../constants";

interface SortDropdownProps {
  onChange: (option: string) => void;
}

export const SortDropdown = ({ onChange }: SortDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("None");
  const sortRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleListClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLabelClick = ({
    label,
    value,
  }: {
    value: string;
    label: string;
  }) => {
    onChange(value);
    setIsDropdownOpen(false);
    setSelectedOption(label);
  };

  return (
    <div ref={sortRef} className="relative w-[169px] md:w-[195px]">
      <input
        type="text"
        onClick={handleListClick}
        value={selectedOption}
        className="h-[46px] w-full cursor-pointer rounded-[100px] border-[2px] border-[#34387f] bg-transparent py-[14px] pl-[24px] text-[14px] leading-[1.29] text-[#fafafa] md:h-[50px] md:py-[16px] md:text-[16px] md:leading-[1.12]"
        readOnly
      />

      <Icon
        id="chevron-left"
        className={`absolute right-[28px] top-1/2 size-[15px] -translate-y-1/2 transition duration-300 ${isDropdownOpen ? "rotate-90" : "-rotate-90"} cursor-pointer fill-[#fafafa]`}
        onClick={handleListClick}
      />

      {isDropdownOpen && (
        <ul className="absolute top-full z-[10] w-[169px] space-y-[8px] rounded-[16px] bg-[#171717] px-[24px] py-[14px] text-[12px] leading-[1.17] text-[#fafafa4c] md:w-[195px] md:text-[16px] md:leading-[1.12]">
          {sortOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleLabelClick(option)}
              className={`cursor-pointer space-y-[8px] transition duration-300 hover:text-[#b5b2b2] ${selectedOption === option.label ? "text-[#fafafa]" : ""}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
