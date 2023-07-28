import { Link, useNavigate } from "react-router-dom"
import httpClient from "../httpClient"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/DataProvider"

const Login = () => {
    const { user, setUser } = useContext(DataContext);
    /*
    Different way to authenticate user...
    const [entry, setEntry] = useState("");
    const [password, setPassword] = useState("");
    const logInUser = async () => {
        const response = await httpClient.post("//localhost:5000/registration", {
            entry,
            password,
        })
    }
    */
    const navigate = useNavigate()

    const toRegisterPage = () => {
        navigate('/register')
    }

    const showPassword = () => {
        let element = document.getElementById("login-pw")
        if (element.type === "password") {
            element.setAttribute("type", "text")
        } else if (element.type === "text") {
            element.setAttribute("type", "password")
        }
    }


    const loginSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson)
        const resp = await fetch(`http://localhost:5000/login`, {
            "method" : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(formJson)
        })
        .then(resp => resp.json())
        .then((data) => {if (data.data === "authenticated") {
            console.log("User match!")
            console.log(data.user)
            setUser(data.user)
            navigate('/')
        } else if (data.data === "wrongUsernameEmail") {
            alert("No user found with this username/email. Please register an account")
        } else if (data.data === "wrongPassword") {
            alert("Password is incorrect.")
        }
        })
    }


    return (
        <>
        <div className="register-container mt-5">


                <div className='log-div flx-c bg-gains see-thru'>
                    <div className="top-box">
                        <h2 className='center-text my-2 white-text'>Let's Workout!</h2>
                    </div>
                    <form method="POST" onSubmit={loginSubmit}>
                    <div className='flx-c pad16'>
                    <label htmlFor="un" className="form-label m0 left-text">&nbsp;<strong>Username:</strong></label>
                    <input name="username_email" className='form-input2' type="text" placeholder="Email or Username" />
                    <label htmlFor="pw" className="form-label m0 left-text">&nbsp;<strong>Password:</strong></label>
                    
                    <input name="password" className='form-input2' id="login-pw" type="password" placeholder="Password" />
                    <div>
                    <input id="show-password" type="checkbox" onClick={()=> showPassword()} />
                    <label id="sp-label" htmlFor="show-password">Show Password</label>
                    </div>
                    <div className='pad28'>
                        <button className='dark-btn center'>Login</button>
                        <p className='center-text mb-0 uline'><Link className="black-text mt-3" to="/register">Don't have an account?</Link></p>
                        <button className='green-btn center' onClick={toRegisterPage}>Create an account</button>
                    </div>
                    </div>
                    </form>
                </div>
            </div>
            </>
    )
}
export default Login;