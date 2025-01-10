import { loaderImg } from "../../assets";

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex h-full w-full items-center justify-center bg-[#000000e8]">
      <img
        src={loaderImg}
        alt="Loader image"
        width={130}
        height={130}
        className="animate-spinPulse"
      />
    </div>
  );
};
