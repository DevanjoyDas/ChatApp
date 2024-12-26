
import Icon from "./Icon";
import "../styles/componentStyles/SearchBar.css"
type SearchFieldProps = {
  placeholder?: string;
  [x: string]: any;
};

export default function SearchBar(props: SearchFieldProps) {
  const { placeholder, ...rest } = props;

  return (
    <div className="searchwrapper-searchbar" {...rest}>
      <div className="iconcontainer-searchbar">
        <Icon id="search" className="search-icon" />
        <button className="search__back-btn">
          <Icon id="back" />
        </button>
      </div>
      <input className="input-searchbar" placeholder={placeholder ?? "Search or start a new chat"} />
    </div>
  );
}
