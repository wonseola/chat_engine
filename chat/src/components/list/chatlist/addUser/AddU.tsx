import "./addUser.css"

const AddUser = () => {
    return (
        <div className="addUser">
            <form >
                <input type="text" placeholder="Username" name="username" />
                <button>Search</button>
            </form>
            <div className="addu">
                <div className="adduserdetail">
                    <img src="./avatar.png" alt="" />
                    <span>name name user name</span>
                </div>
                <button id="bb">Add User</button>
            </div>
        </div>
    )
}

export default AddUser