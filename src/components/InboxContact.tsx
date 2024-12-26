
import { Inbox } from "../utils/types";
import "../styles/componentStyles/InboxContact.css"
type InboxContactProps = {
  inbox: Inbox;
  onChangeChat?: Function;
  isActive?: boolean;
};

export default function InboxContact(props: InboxContactProps) {
  const { onChangeChat, isActive } = props;
  const { name, image} = props.inbox;

  const handleChangeChat = () => {
    if (onChangeChat) {
      onChangeChat(props.inbox);
    }
  };

  return (
    <div className={`contact-inboxcontact ${isActive?"activecontact-inboxcontact":""}`} onClick={handleChangeChat}>
      <div className="imgwrapper-contact">
        <img className="img-contact" src={image} />
      </div>
      <div className="content-contact">
        <div className="topcontent-contact">
          <h2 className="name-contact">{name}</h2>
    
        </div>

        <div className="bottom-contact">

        </div>
      </div>
    </div>
  );
}



