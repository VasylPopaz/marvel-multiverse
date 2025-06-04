import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { SearchInput, SortDropdown } from "../components";

import { useSearchParams } from "../hooks";

interface FormValues {
  comics: string;
  nameStartsWith: string;
}

export const Filters = () => {
  const { getSearchParam, setSearchParams } = useSearchParams();

  const rawComics = getSearchParam("comics");
  const rawName = getSearchParam("name");

  const name = decodeURIComponent(rawName || "");

  const form = useForm<FormValues>();

  useEffect(() => {
    form.setValue("comics", rawComics || "");
    form.setValue("nameStartsWith", name || "");
  }, [rawComics, name, form]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setSearchParams({ name: data.nameStartsWith, comics: data.comics });
  };

  return (
    <div className="mx-auto mb-10 flex max-w-[860px] flex-col gap-3 md:mb-16 md:flex-row md:gap-2 lg:gap-4">
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
      </div>
    </div>
  );
};
