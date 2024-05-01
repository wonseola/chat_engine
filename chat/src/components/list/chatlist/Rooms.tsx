import { useEffect, useState } from "react"
import "./rooms.css"
import AddUser from "./addUser/AddU";
import { useUserStore } from "../../../lib/userStore";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const Rooms = () => {
    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);

    const { currentUser } = useUserStore();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "userchats", currentUser!.id), (doc) => {
            if (doc.exists()) {
                setChats(doc.data() as never[]);
            }
            return () => { unsub() }
        });
    }, [currentUser]);
    console.log(chats)

    return (
        <div className="chatlist">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder="Search" />
                </div>
                <img src={addMode ? "./minus.png" : "./plus.png"}
                    alt="" className="add"
                    onClick={() => setAddMode((prev) => !prev)}
                />
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>namename</span>
                    <p>Hello</p>
                </div>
            </div><div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>namename</span>
                    <p>Hello</p>
                </div>
            </div><div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>namename</span>
                    <p>Hello</p>
                </div>
            </div>
            {addMode && <AddUser />}
        </div>
    )
}

export default Rooms