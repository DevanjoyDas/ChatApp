
import { useNavigate } from "react-router-dom"
import "../styles/componentStyles/Sidebar.css"
import Icon from "./Icon"
import MoreOptions from "./MoreOptions"
import SearchBar from "./SearchBar"
import { Inbox } from "../utils/types"
import InboxContact from "./InboxContact"
import { useChatContext } from "../context/chatContext"
const Sidebar = () => {
    const navigate = useNavigate();
  const chatCtx = useChatContext();

  const handleChangeChat = (chat: Inbox) => {
    chatCtx.onChangeChat(chat);
    navigate("/" + chat.id);
  };
    return (
        <aside className='container-sidebar'>
            <header className='header-sidebar'>
                <div className='imgdiv-sidebar'>
                    <img className='img-sidebar' src="https://devanjoy-portfolio.vercel.app/assets/images/DevanjoyDas.jpeg" alt="" />
                </div>
                <div className="actions-sidebar">
                    <button aria-label="Status">
                        <Icon id="status" className="icon" />
                    </button>
                    <button aria-label="New chat">
                        <Icon id="chat" className="icon" />
                    </button>
                    <MoreOptions iconClassName="icon"
                        className="icon"
                        ariaLabel="Menu"
                        iconId="menu"
                        options={[
                            "New group",
                            "Profile",
                            "Archived",
                            "Starred",
                            "Settings",
                            "Log out",
                        ]} />
                </div>
            </header>
            <SearchBar/>
            <div className="contacts-sidebar">
            {chatCtx.inbox.map((inbox) => (
          <InboxContact
            key={inbox.id}
            inbox={inbox}
            isActive={inbox.id === chatCtx.activeChat?.id}
            onChangeChat={handleChangeChat}
          />
        ))}
            </div>
        </aside>
    )
}

export default Sidebar