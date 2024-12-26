import Icon from "../Icon";
import MoreOptions from "../MoreOptions";
import "../../styles/componentStyles/Header.css"

type HeaderProps = {
  title: string;
  image: string;
};

export default function Header(props: HeaderProps) {
  const { title,image} = props;

  return (
    <div className="container-header">
      <div className="imgwrapper-header">
        <img className="avatar-header" src={image} />
      </div>
      <div className="profile-header">
        <h2 className="name-header">{title}</h2>
      </div>
      <div className="actions-header">
        <button className="button-header">
          <Icon id="search" className="icon search-icon" />
        </button>
        <MoreOptions
          styles={{"margin-left":"25px","cursor":"pointer"}}
          ariaLabel="Menu"
          iconId="menu"
          iconClassName="icon"
          options={[
            "Contact Info",
            "Select Messages",
            "Mute notifications",
            "Clear messages",
            "Delete chat",
          ]}
        />
      </div>
    </div>
  );
}
