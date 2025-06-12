import { useEffect } from "react";
import DatePicker from "react-datepicker";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Icon, SearchInput, SortDropdown } from "../components";

import { useSearchParams } from "../hooks";
import "react-datepicker/dist/react-datepicker.css";

interface FormValues {
  comics: string;
  nameStartsWith: string;
}

export const Filters = () => {
  const { getSearchParam, setSearchParams, removeAllSearchParams } =
    useSearchParams();

  const rawComics = getSearchParam("comics");
  const rawName = getSearchParam("name");
  const rawModifiedSince = getSearchParam("modifiedSince");

  const name = decodeURIComponent(rawName || "");
  const modifiedSince = decodeURIComponent(
    rawModifiedSince || new Date().toISOString()
  );

  const form = useForm<FormValues>();

  useEffect(() => {
    form.setValue("comics", rawComics || "");
    form.setValue("nameStartsWith", name || "");
  }, [rawComics, name, form]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSearchParams({ modifiedSince: date.toISOString() });
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setSearchParams({ name: data.nameStartsWith, comics: data.comics });
  };

  return (
    <div className="relative mx-auto mb-10 flex max-w-[860px] flex-col gap-3 md:mb-16 md:flex-row md:items-end md:gap-2 lg:gap-4">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 md:flex-row md:gap-2 lg:gap-4"
        >
          <SearchInput
            label="Comics"
            name="comics"
            placeholder="Enter text"
            className="bg-[#34387f]"
            labelClassName="md:w-[180px]"
          />
          <SearchInput
            label="Name Starts With"
            name="nameStartsWith"
            placeholder="Enter text"
            className="bg-transparent"
            labelClassName="md:w-[168px]"
          />
          <button type="submit" className="hidden"></button>
        </form>
      </FormProvider>
      <div className="flex gap-2">
        <SortDropdown />
        <label className="flex flex-col gap-1 text-[12px] text-[#fafafa4c] md:gap-2 md:text-[14px]">
          Date
          <DatePicker
            selected={new Date(modifiedSince)}
            onChange={handleDateChange}
            shouldCloseOnSelect={true}
          />
        </label>
      </div>
      <button
        type="button"
        className="flex h-[46px] items-center justify-center gap-4 rounded-full border-2 border-[#34387f] bg-transparent p-1 transition duration-300 hover:border-primaryTextColor focus-visible:border-primaryTextColor md:mb-2 md:h-[40px] md:w-[40px] lg:m-0 lg:h-[50px] lg:w-[50px]"
        onClick={removeAllSearchParams}
      >
        <span className="md:hidden">Reset filters</span>{" "}
        <Icon
          id="reset"
          className="size-4 fill-primaryTextColor md:inline-flex"
        />
      </button>
    </div>
  );
};
