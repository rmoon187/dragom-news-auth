import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";


const Login = () => {
    const { signIn, setUser } = useContext(AuthContext)
    const [error, setError] = useState({})
    const navigate = useNavigate()
    const loca = useLocation()
    const handlesub = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value
        const pass = form.password.value
        signIn(email, pass)
            .then((result) => {
                const user = result.user
                setUser(user)
                navigate(loca?.state ? loca.state : '/')
            })
            .catch((err) => {
                setError({ ...error, login: err.code })

            });
    }
    return (
        <div className=" flex min-h-screen justify-center items-center">
            <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
                <h2 className="font-bold text-2xl text-center mb-10 ">Login your account</h2>
                <hr />
                <form onSubmit={handlesub} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                    </div>
                    {error.login && <label className="label text-red-500">{error.login}</label>}
                    <div className="form-control mt-6">
                        <button className="btn btn-neutral rounded-none">Login</button>
                    </div>
                </form>
                <p className="text-center font-semibold">Dont’t Have An Account ? <Link className="text-red-500" to={'/auth/register'}>Register</Link></p>
            </div>
        </div>
    );
};

export default Login;