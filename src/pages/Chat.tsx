import useChatRoom from "../utils/hooks/useChat";
import useNavigateToChat from "../utils/hooks/useNavigateToChat";
import "../styles/pageStyles/Chat.css"
import Header from "../components/ChatComponents/Header";
import MessagesList from "../components/ChatComponents/MessagesList";
import Icon from "../components/Icon";
import Footer from "../components/ChatComponents/Footer";

export default function Chat() {
  const {
    activeInbox,
    handleShowIcon,
    isShowIcon,
    setShouldScrollToBottom,
    shouldScrollToBottom,
  } = useChatRoom();
  useNavigateToChat(activeInbox);

  return (
      <div className="container-chat">
        <div className="body-chat">
          <div className="bg-chat"></div>
          <Header
            title={activeInbox?.name ?? ""}
            image={activeInbox?.image ?? ""}
          />
          <MessagesList
            onShowBottomIcon={handleShowIcon}
            shouldScrollToBottom={shouldScrollToBottom}
          />
          <div className="footercontainer-chat">
            {isShowIcon && (
              <button className="scrollbtn-chat" onClick={() => setShouldScrollToBottom(true)}>
                <Icon id="downArrow" />
              </button>
            )}
            <Footer />
          </div>
        </div>
      </div>
  );
}
