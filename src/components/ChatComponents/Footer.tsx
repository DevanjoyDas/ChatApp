import { useState } from "react";
import Icon from "../Icon";
import "../../styles/componentStyles/Footer.css"
import { useParams } from "react-router-dom";
import { db } from "../../App";
import { id } from "@instantdb/react";

const attachButtons = [
  { icon: "attachRooms", label: "Choose room" },
  { icon: "attachContacts", label: "Choose contact" },
  { icon: "attachDocument", label: "Choose document" },
  { icon: "attachCamera", label: "Use camera" },
  { icon: "attachImage", label: "Choose image" },
];

export default function Footer() {
  const {chatId} = useParams();
  const [showIcons, setShowIcons] = useState(false);
  const [msg,setMsg] = useState<string>("");

  const createMessageInDB = (msg:any)=>{
      let msgObj = {
        body : msg,
        messageStatus : "READ",
        isOpponent : false
      }
      if(chatId !== "38v8ury2e7eleynh2h3"){
        msgObj.isOpponent = true
      }
      db.transact(db.tx.message[id()].update(msgObj));
      setMsg("")
  }

  return (
    <div className="wrapper-footer">
      <div className="iconswrapper-footer">
        <button className="attachicon" onClick={() => setShowIcons(!showIcons)}>
          <Icon id="attach" className="icon" />
        </button>
        <div className="btncontainer-footer">
          {attachButtons.map((btn) => (
            <button className={`btn-footer ${showIcons?"scalebtn":"notscalebtn"}`} key={btn.label}>
              <Icon id={btn.icon} />
            </button>
          ))}
        </div>
      </div>
      <input value={msg} type="text" onChange={(e)=>{
          setMsg(e.target.value)
      }} className="input-footer" placeholder="Type a message here .." />
      <button onClick={()=>{
        createMessageInDB(msg);
      }} className="sendbtn">
        <Icon id="send" className="icon" />
      </button>
    </div>
  );
}
