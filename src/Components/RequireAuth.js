import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    
    const { auth, setAuth } = useAuth();

    var data =localStorage.getItem("auth");
    let expiry = localStorage.getItem("expiry");
    let now = Date.now();
    //window.alert("Now is:"+now +"and it will expire on "+expiry)
    
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
        //data = localStorage.getItem("auth");
        //window.alert("Data: "+data);
        
        let rols =[];
        rols.push(data.role);
        //window.alert("Data: "+data.role);
        let res = {
            user: data.username,
            pwd: "",
            accessToken: data.token,
            roles: data.role
        }
        
        setAuth(res);
    },[]);


    //window.alert("Role of auth is "+JSON.stringify(auth.roles));
   
   
    const location = useLocation();
    //const authenticate = localStorage.getItem("auth");
    //console.log("Local Role Dhek in RequireAuth: "+ JSON.stringify(authenticate))
    //console.log("Auth Role Dhek in RequireAuth: "+ JSON.stringify(auth.roles))
    //window.alert("Required role is "+allowedRoles[0]+" & "+allowedRoles[1]+ " i have role of "+ JSON.stringify(auth.roles));
    //let check = allowedRoles?.includes(auth.roles[0])
    
    //window.alert("Auth local is: "+ data.role+ " and check is: "+allowedRoles?.includes(auth?.roles));
    
    
    
    //window.alert("Check for -"+auth.roles+"-: "+check);
    
    return (
        allowedRoles?.includes(data?.role)
            ? <Outlet />
            : data?.token //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;