import { Logo, CharacterSearchAutocomplete } from "../components";

export const Header = () => {
  return (
    <header className="py-5 md:py-[25px]">
      <div className="container flex items-center justify-between">
        <Logo />
        <CharacterSearchAutocomplete />
      </div>
    </header>
  );
};
