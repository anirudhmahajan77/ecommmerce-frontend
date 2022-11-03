//import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const {auth } = useAuth();

    const refresh = async () => {
        //let data = JSON.parse(localStorage.getItem("auth"));
        
        /*setAuth(prev => {
            return {
                ...prev,
                roles: data.roles,
                accessToken: data.accessToken
            }
        });
        //setAuth({data})*/
        return auth.accessToken;
    }
    return refresh;
};

export default useRefreshToken;