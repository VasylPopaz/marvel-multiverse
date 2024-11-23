import { Icons } from "../../assets";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  id: string;
}

export const Icon = ({ id, ...rest }: IconProps) => {
  return (
    <svg {...rest}>
      <use href={Icons + "#icon-" + id}></use>
    </svg>
  );
};
