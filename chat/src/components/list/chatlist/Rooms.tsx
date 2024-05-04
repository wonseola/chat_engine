import { FC, useEffect, useState } from "react";
import "./rooms.css";
import AddUser from "./addUser/AddU";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";

interface Chat {
    chatId: string;
    lastMessage: string;
    updateAt: number;
}

const Rooms: FC = () => {
    const [addMode, setAddMode] = useState<boolean>(false);
    const [chats, setChats] = useState<Chat[]>([]);

    const { currentUser } = useUserStore();

    useEffect(() => {
        if (currentUser) {
            const unsub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
                if (res.exists()) {
                    const items = res.data().chats;
                    const promisses = items.map(async (item: any) => {
                        const userDocRef = doc(db, "users", item.receiverId);
                        const userDocSnap = await getDoc(userDocRef);
                        const user = userDocSnap.data();

                        return { ...item, user };
                    })
                    const chatData = await Promise.all(promisses);

                    setChats(chatData.sort((a, b) => b.updateAt - a.updateAt));
                }
            });
            return () => unsub();
        }
    }, [currentUser]);

    return (
        <div className="chatlist">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder="Search" />
                </div>
                <img
                    src={addMode ? "./minus.png" : "./plus.png"}
                    alt=""
                    className="add"
                    onClick={() => setAddMode((prev) => !prev)}
                />
            </div>
            {chats.map((chat) => (
                <div className="item" key={chat.chatId}>
                    <img src={chat.user.avatar || "./avatar.png"} alt="" />
                    <div className="texts">
                        <span>{chat.user.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
            {addMode && <AddUser />}
        </div>
    );
};

export default Rooms;
