import { useFormContext } from "react-hook-form";

import { Icon } from "../components";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  className?: string;
  labelClassName?: string;
}

export const SearchInput = ({
  label,
  name,
  className,
  labelClassName,
  ...props
}: SearchInputProps) => {
  const { register } = useFormContext();

  return (
    <label
      className={`relative flex flex-col gap-1 text-[12px] text-[#fafafa4c] md:gap-2 md:text-[14px] ${labelClassName}`}
    >
      {label}
      <input
        type="text"
        className={`h-[46px] w-full rounded-[1000px] border-2 border-accentColor py-3.5 pl-6 pr-9 text-[12px] leading-[1.17] text-primaryTextColor outline-none transition duration-300 placeholder:text-primaryTextColor focus-visible:border-primaryTextColor md:h-[50px] md:py-4 md:pr-10 md:text-[14px] md:leading-[1.29] lg:z-[1] ${className}`}
        {...register(name)}
        {...props}
      />
      <Icon
        id="search"
        width={18}
        height={18}
        className="absolute bottom-1.5 right-4 z-[1] -translate-y-1/2 fill-transparent stroke-white md:right-6 lg:h-[18px] lg:w-[18px]"
      />
    </label>
  );
};
