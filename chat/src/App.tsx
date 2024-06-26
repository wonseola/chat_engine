import { useEffect } from "react";
import Chat from "./components/chat/Chat"
import Detail from "./components/detail/Detail"
import List from "./components/list/List"
import Login from "./components/login/Loginpage";
import Notification from "./components/notification/Noti";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";


function App() {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user ? user?.uid : "");
    })
    return () => {
      unSub();
    }
  }, []);
  console.log(currentUser);
  if (isLoading) return <div className="loading">Loading . . . </div>

  return (
    <>
      <div className="container">
        {
          currentUser ? (
            <>
              <List />
              <Chat />
              <Detail />
            </>
          ) : (<Login />)
        }
        <Notification />
      </div>

    </>
  )
}

export default App
