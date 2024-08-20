import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
    const Navigate = useNavigate();
    useEffect(()=>{
        window.localStorage.removeItem("user");
    },[]);
    return (
      <div>
        <h2>Logout</h2>
        <p>You have been logged out.</p>
        <button onClick={()=>{Navigate("/login")}}>Logn here again.</button>
      </div>
    );
}