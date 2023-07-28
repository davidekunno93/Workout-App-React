import { Link, useNavigate } from "react-router-dom"
import { DataContext } from "../context/DataProvider";
import { useContext } from "react";


const Navbar = () => {
    const { user, setUser } = useContext(DataContext);

    const navigate = useNavigate();

    const logoutUser = () => {
        setUser(null);
    }
    return(
        <div className="bg-black navbar pad8">
            <img className="nav-logo" src="/images/fithub-logo-white.png" />
            <Link className="link mx-2" to="/">Home</Link>
            <Link className="link mx-2" to="/workout">Workout</Link>
            <Link className="link mx-2" to="/">My Workouts</Link>
            <Link className="link mx-2" to="/">My Account</Link>
            
            <Link className="right mx-2"></Link>
            {user ? 
            <p className="username right mx-2">{user.username} | <Link to="/login" onClick={() => logoutUser()}>Logout</Link></p> 
            : 
            <>
            <Link className="link mx-2" to="/register">Sign Up</Link>
            <Link className="link mx-2" to="/login">Sign In</Link>
            </>
            }
            
        </div>
    )

}
export default Navbar;