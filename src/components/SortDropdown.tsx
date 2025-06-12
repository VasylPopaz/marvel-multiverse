import { RefObject, useEffect, useRef, useState } from "react";

import { Icon } from "../components";

import { sortOptions } from "../constants";
import { useSearchParams } from "../hooks";

export const SortDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const selectedLabel =
    sortOptions.find((o) => o.value === selectedOption)?.label ?? "None";

  const { getSearchParam, setSearchParam, removeSearchParam } =
    useSearchParams();

  const sortRef: RefObject<HTMLDivElement> = useRef(null);

  const rawOrderBy = getSearchParam("orderBy");

  useEffect(() => {
    if (rawOrderBy) {
      setSelectedOption(rawOrderBy);
    }
  }, [rawOrderBy]);

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

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLabelClick = ({ value }: { value: string }) => {
    setIsDropdownOpen(false);
    setSelectedOption(value);
    if (value) {
      setSearchParam("orderBy", value);
    } else {
      removeSearchParam("orderBy");
    }
  };

  return (
    <div ref={sortRef} className="relative w-[169px] md:w-[164px] lg:w-[185px]">
      <p className="mb-1 text-[12px] text-[#fafafa4c] md:mb-2 md:text-[14px]">
        Order by
      </p>
      <div
        className={`border-accentColor relative h-[46px] w-full cursor-pointer rounded-[100px] border-[2px] bg-transparent py-3.5 pl-6 text-[14px] leading-[1.29] text-[#fafafa] transition duration-300 hover:border-primaryTextColor md:h-[50px] md:py-[16px] md:text-[16px] md:leading-[1.12] ${isDropdownOpen ? "!border-primaryTextColor" : ""}`}
        onClick={toggleDropdown}
      >
        {selectedLabel}
        <Icon
          id="chevron-left"
          className={`absolute right-[28px] top-1/2 size-[15px] -translate-y-1/2 transition duration-300 md:right-[30px] ${isDropdownOpen ? "rotate-90" : "-rotate-90"} fill-[#fafafa]`}
        />
      </div>

      {isDropdownOpen && (
        <ul
          className="absolute top-full z-[10] w-[169px] space-y-2 rounded-[16px] bg-[#171717] px-6 py-3.5 text-[12px] leading-[1.17] text-[#fafafa4c] md:w-[164px] md:text-[16px] md:leading-[1.12] lg:w-[185px]"
          role="listbox"
        >
          {sortOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleLabelClick(option)}
              className={`cursor-pointer space-y-2 transition duration-300 hover:text-[#b5b2b2] ${selectedOption === option.value ? "text-[#fafafa]" : ""}`}
              role="option"
              aria-selected={selectedOption === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
