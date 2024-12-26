import { forwardRef } from "react";
import { useParams } from "react-router-dom";
import useScrollToBottom from "../../utils/hooks/useScrollToBottom";
import Icon from "../Icon";
import "../../styles/componentStyles/MessagesList.css"
import { db } from "../../App";
import { Message } from "../../utils/types";

type MessagesListProps = {
  onShowBottomIcon: Function;
  shouldScrollToBottom?: boolean;
};

export default function MessagesList(props: MessagesListProps) {
  const { onShowBottomIcon, shouldScrollToBottom } = props;
  const params = useParams();
  const query = { message: {} };
const { isLoading,data } = db.useQuery(query);

  const { containerRef, lastMessageRef } = useScrollToBottom(
    onShowBottomIcon,
    shouldScrollToBottom,
    params.chatId
  );

  if(isLoading){
    return <div>Loading</div>
  }
  let messages;
  if(data && data.message && data.message.length>0){

    messages = data.message;
    
  }

  return (
    <div className="container-messagelist" ref={containerRef}>
      <p className="enc-msg">
        <Icon id="lock" className="icon" />
        Messages are end-to-end encrypted. No one outside of this chat, not even ChatApp, can read
        or listen to them. Click to learn more.
      </p>
      <div className="datewrapper">
        <span className="date-message"> TODAY </span>
      </div>
      <div className="msg-group">
        {messages && messages.length>0 && messages.map((message, i) => {
          if (i === messages.length - 1) {
            return <SingleMessage key={message.id} message={message} ref={lastMessageRef} />;
          } else {
            return <SingleMessage key={message.id} message={message} />;
          }
        })}
      </div>
    </div>
  );
}

const SingleMessage = forwardRef((props: { message: Message }, ref: any) => {
  const { message } = props;
  const {chatId} = useParams();
  return (
    <div
      key={message.id}
      className={`${
        (chatId === "38v8ury2e7eleynh2h3" && !message.isOpponent) || (chatId !== "38v8ury2e7eleynh2h3" && message.isOpponent)
          ? "chat__msg--sent chat-message" 
          : "chat__msg--received chat-message" 
      }`}
      ref={ref}
    >
      <span>{message.body}</span>
      <span className="filler" />
      <span className="footer-msg">
        {((chatId === "38v8ury2e7eleynh2h3" && !message.isOpponent) || (chatId !== "38v8ury2e7eleynh2h3" && message.isOpponent) ) && (
          <Icon
            id={"doubleTick"}
            
            className={`chat__msg-status-icon ${
              "chat__msg-status-icon--blue"
            }`}
          />
        )}
      </span>
    </div>
  );
});
