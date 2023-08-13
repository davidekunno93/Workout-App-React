import { Link, useNavigate } from "react-router-dom"
import { DataContext } from "../context/DataProvider";
import { useContext, useEffect } from "react";


const Navbar = () => {
    const { user, setUser } = useContext(DataContext);
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const resp = await fetch("http://localhost:5000/signin-check", {
    //                 "method" : "POST"
    //             })
    //             .then(resp => console.log(resp.data))
    //         } catch (error) {
    //             console.log("Not authenticated");
    //         }
    //     })()
    // }, [])

    const checkSignIn = async () => {
        const url = 'http://localhost:5000/signin-check'
        const resp = await fetch(url, {
            "method": "POST",
        })
            .then(resp => resp.json())
            .then(data => setUser(data.data))
    }

    const navigate = useNavigate();

    const logoutUser = async () => {
        const url = "http://localhost:5000/logout"
        const resp = await fetch(url, {
            "method": "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
            .then(resp => resp.json())
            .then(data => data.status === "OK" ? setUser(null) : console.log("Logout status not OK"))

    }
    return (
        <div className="bg-black navbar pad8">
            <img className="nav-logo" src="/images/fithub-logo-white.png" />
            <img className="nav-text-logo" src="/images/fithub-text-logo.png" />
            <Link className="link mx-1" to="/"><button className="nav-btn">Feed</button></Link>
            {user ?
            <>
            <Link className="link mx-1" to="/workout"><button className="nav-btn">Let's Workout</button></Link>

            <div className="dropdown mb-1">
                <button className="dropbtn">My Workouts
                    <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content flx-c">
                    <Link className="drop-op" to="#">My Creations</Link>
                    <Link className="drop-op" to="#">My Favorites</Link>
                    <Link className="drop-op" to="#">History</Link>
                </div>
            </div>
            <Link className="link mx-1" to="/"><button className="nav-btn">My Account</button></Link>
            <Link className="link mx-1" to="/"><button className="nav-btn">Buddies</button></Link>

            </> 
            :
            null }
            <Link className="right mx-2"></Link>
            {user ?
                <p className="username right mx-2 mt-3h">{user.username} | <Link to="/login" onClick={() => logoutUser()}>Logout</Link></p>
                :
                <>
                    <Link className="link mx-1 right mt-2" to="/register"><button className="nav-btn">Sign Up</button></Link>
                    <Link className="link mx-1 right mt-2" to="/login"><button className="nav-btn">Sign In</button></Link>
                </>
            }

        </div>
    )

}
export default Navbar;