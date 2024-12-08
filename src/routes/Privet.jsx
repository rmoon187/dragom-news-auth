import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../pages/Loading";


// eslint-disable-next-line react/prop-types
const Privet = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const loc = useLocation()
    if (loading) {
        return <Loading></Loading>
    }
    if (user && user?.email) {
        return children
    }
    return <Navigate state={loc.pathname} to={'/auth/login'}></Navigate>

};

export default Privet;