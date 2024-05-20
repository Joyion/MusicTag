
import { useNavigate } from "react-router-dom";



export default function ProtectedRoute(component) {

    const navigate = useNavigate();

    const {currentUser,setCurrentUser} = useContext(UserContext);
    
    if(currentUser === null) {
        navigate("/login")
    } else {
        return component
    }

}