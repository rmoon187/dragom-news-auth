import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";



const Register = () => {
    const { createNewUser, setUser, updateData } = useContext(AuthContext);
    const [error, setError] = useState({})
    const navi = useNavigate()

    const handleSub = (e) => {
        e.preventDefault()
        const form = new FormData(e.target);
        const name = form.get("name");
        if (name.length < 5) {
            setError({ ...error, name: "Must be more than 5 letters" })
            return
        }
        const email = form.get("email");
        const pass = form.get("password");
        const url = form.get("photo");


        createNewUser(email, pass)
            .then((result) => {
                const user = result.user
                setUser(user)
                updateData({ displayName: name, photoURL: url })
                    .then(() => {
                        navi('/')
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }
    return (
        <div className=" flex min-h-screen justify-center items-center">
            <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
                <h2 className="font-bold text-2xl text-center mb-10 ">Register your account</h2>
                <hr />
                <form className="card-body" onSubmit={handleSub}>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                        <input name="name" type="text" placeholder="Enter your name" className="input input-bordered" required />
                    </div>
                    {error.name && <label className="label text-red-500">{error.name}</label>}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input name="photo" type="text" placeholder="Enter url" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="Enter your email address" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-neutral rounded-none">Register</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Register;