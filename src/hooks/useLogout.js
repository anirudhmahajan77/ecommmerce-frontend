//import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { auth, setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        window.location.reload();
    }

    return logout;
}

export default useLogout