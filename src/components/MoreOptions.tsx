import { useState } from "react";
import Icon from "./Icon";
import useCloseMenu from "../utils/hooks/useCloseMenu";
import "../styles/componentStyles/MoreOptions.css"
type OptionsMenuProps = {
  iconClassName?: string;
  className?: string;
  iconId: string;
  ariaLabel?: string;
  options: string[];
  position?: string;
  showPressed?: boolean;
  [x: string]: any;
};

export default function MoreOptions(props: OptionsMenuProps) {
  const [showOptions, setShowOptions] = useState(false);
  const ref = useCloseMenu(() => setShowOptions(false));
  const {
    iconId,
    options,
    ariaLabel,
    className,
    iconClassName,
    position = "left",
    showPressed = true,
  } = props;

  const getBtnClassName = (): string => {
    let _className = showOptions && showPressed ? "btn-pressed " : "";
    _className += className ?? "";

    return _className;
  };

  const getOptionsClassName = (): string => {
    let className = showOptions ? "active ul-moreoptions" : "ul-moreoptions";
    className += position === "right" ? "right" : "";

    return className;
  };

  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="container-moreoptions" ref={ref}>
      <button  aria-label={ariaLabel} className={getBtnClassName()} onClick={handleClick}>
        <Icon id={iconId} className={iconClassName} />
      </button>
      <ul className={getOptionsClassName()}>
        {options.map((option) => (
          <li className="li-moreoptions" key={option}>{option}</li>
        ))}
      </ul>
    </div>
  );
}
