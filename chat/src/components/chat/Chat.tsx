import { useState } from "react"
import "./chat.css"
import EmojiPicker from "emoji-picker-react"


const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const handleEmoji = (event: any) => {
        // console.log(event);
        setText((prev) => prev + event.emoji);
        setOpen(false);
    }

    return (
        <div className="chat">
            <div className="top">
                <div className="chatuser">
                    <img src="./avatar.png" alt="" />
                    <div className="chattexts">
                        <span>name name</span>
                        <p>dddddddddddd</p>
                    </div>
                </div>
                <div className="chaticons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="messages">
                        <p>asdfadfadfadfadfadsfadfad</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="messages">
                        <img src="https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG" alt="" />
                        <p>asdfadfadfadfadfadsfadfad</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="messages">
                        <p>asdfadfadfadfadfadsfadfad</p>
                        <span>1 min ago</span>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="chaticonsb">
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input type="text"
                    placeholder="Type a message . . ."
                    value={text}
                    className="chatinput"
                    onChange={(event) => setText(event.target.value)}
                />
                <div className="emoji">
                    <img src="./emoji.png" alt=""
                        onClick={() => setOpen(prev => !prev)} />
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button className="sendButton">Send</button>
            </div>
        </div>
    )
}

export default Chat