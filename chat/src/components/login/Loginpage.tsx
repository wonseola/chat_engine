import { useState } from "react"
import "./login.css"
import { toast } from "react-toastify"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../lib/firebase.ts"
import { doc, setDoc } from "firebase/firestore"
import upload from "../../lib/upload.ts"



const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    }
    );

    const [loading, setLoading] = useState(false);


    const handleAvatar = (e: any) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData) as {
            email: string;
            password: string;
        };
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login");

        } catch (err: any) {
            toast.error(err.messgae);
        }
    }

    const handleRegister = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formData) as {
            username: string;
            email: string;
            password: string;
        };

        try {

            const res = await createUserWithEmailAndPassword(
                auth, email, password);

            const imgUrl = await upload(avatar.file);

            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: [],
            });
            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: [],
            });

            toast.success("Account created ! You can login now!")

        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login">
            <div className="item">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button disabled={loading}>
                        {loading ? "Loading. . ." : "Sign In"}</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create Account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt="" />
                        Upload an image</label>
                    <input type="file" id="file"
                        style={{ display: "none" }}
                        onChange={handleAvatar} />
                    <input type="text" placeholder="Username" name="username" />
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button disabled={loading}>
                        {loading ? "Loading. . ." : "Sign Up"}</button>
                </form>
            </div>
        </div>
    )
}

export default Login