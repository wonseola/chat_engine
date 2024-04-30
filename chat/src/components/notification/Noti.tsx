import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Notification = () => {
    return (
        <div className="notifi">
            <ToastContainer position="bottom-right" />
        </div>
    )
}

export default Notification