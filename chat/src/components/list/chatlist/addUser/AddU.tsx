import React, { useState, FormEvent } from "react";
import "./addUser.css";
import { collection, getDocs, query, serverTimestamp, setDoc, where, DocumentData, addDoc, doc, updateDoc, arrayUnion, DocumentReference } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useUserStore } from "../../../../lib/userStore";

interface User {
    avatar: string;
    username: string;
}

const AddUser: React.FC = () => {
    const [users, setUsers] = useState<User | null>(null);

    const { currentUser } = useUserStore();

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;

        try {
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", username));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs.map((doc) => doc.data() as User);
                setUsers(userData[0]);
            } else {
                setUsers(null);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleAdd = async () => {
        if (users) {
            const chatRef = collection(db, "chats");
            const userChatRef = collection(db, "userchats");
            try {
                const newChat = doc(chatRef);
                const chatDocRef = await addDoc(chatRef, {
                    createAt: serverTimestamp(),
                    messages: [] as DocumentData[],
                });

                const userChatDoc = await addDoc(userChatRef, {
                    userId: users.username,
                    chatId: chatDocRef.id,
                });

                const userChatDocRef: DocumentReference<DocumentData> = doc(userChatRef, users.username);
                const currentUserChatDocRef: DocumentReference<DocumentData> = doc(userChatRef, currentUser?.id);

                await updateDoc(userChatDocRef, {
                    chats: arrayUnion({
                        chatId: newChat.id,
                        lastMessage: "",
                        receiverId: currentUser?.id,
                        updatedAt: Date.now(),
                    })
                });

                await updateDoc(currentUserChatDocRef, {
                    chats: arrayUnion({
                        chatId: newChat.id,
                        lastMessage: "",
                        receiverId: users.username,
                        updatedAt: Date.now(),
                    })
                });

            } catch (e) {
                console.log(e);
            }
        }
    };


    return (
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Username" name="username" />
                <button type="submit">Search</button>
            </form>
            <div className="addu">
                {users && (
                    <div className="adduserdetail">
                        <img src={users.avatar || "./avatar.png"} alt="" />
                        <span>{users.username}</span>
                        <button id="bb" onClick={handleAdd}>
                            Add User
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddUser;
