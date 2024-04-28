import Rooms from "./chatlist/Rooms.tsx"
import "./list.css"
import Userinfo from "./userinfo/Userinfo"

const List = () => {
    return (
        <div className="list">
            <Userinfo />
            <Rooms />
        </div>
    )
}

export default List