import ListIcons from "../utils/ListOfIcons";

type IconProps = {
  id: string;
  [x: string]: any;
};

export default function Icon(props: IconProps) {
  const { id, ...rest } = props;

  const currentSelectedIcon = ListIcons[id];
  return currentSelectedIcon ? currentSelectedIcon(rest) : null;
}
