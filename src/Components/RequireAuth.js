import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    
    const { setAuth } = useAuth();

    var data =localStorage.getItem("auth");
    let expiry = localStorage.getItem("expiry");
    let now = Date.now();
    
    if((data === undefined) || data === null || expiry === null || expiry === undefined || parseInt(expiry) < now){
        let newData = {
            username: "",
            pwd: "",
            role:"",
            token:"",
        }
        localStorage.setItem("auth", JSON.stringify(newData))
    } else{
        data = JSON.parse(data);
    }
    useEffect(()=>{
        let rols =[];
        rols.push(data.role);
        let res = {
            user: data.username,
            pwd: "",
            accessToken: data.token,
            roles: data.role
        }
        
        setAuth(res);
    },[]);

   
   
    const location = useLocation();
    
    return (
        allowedRoles?.includes(data?.role)
            ? <Outlet />
            : data?.token //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;