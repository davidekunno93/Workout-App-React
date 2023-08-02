import { Link, useNavigate } from "react-router-dom";
import httpClient from "../httpClient";
import { useEffect, useState } from "react";

const Register = () => {
    const navigate = useNavigate()

    const toLoginPage = () => {
        navigate('/login')
    }

    const registerUser = async () => {
        const response = await httpClient.post("//localhost:5000/registration", {
            form,
        })
    }

    const [dataReceived, setDataReceived] = useState("None")
    useEffect(() => {
        if (dataReceived.data === "created") {
            navigate('/login')
        } else if (dataReceived.data === "usernameTaken") {
            alert("This Username is taken. Please create a different one.")
        } else if (dataReceived === "emailUsed") {
            alert("This email already has an account. Navigate to the Sign in page to login.")
        }
    }, [dataReceived])

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        if (formJson.password === formJson.confirmPassword) {
            console.log("Match!")
            console.log(formJson);
            const resp = await fetch(`http://localhost:5000/registration`, {
                "method" : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(formJson)
            })
            // .then(response => response.json())
            // // .then(data => console.log(data)) 
            // // .then(data => setDataReceived(data))
            // .then(data => showDataReceived(data))
            // .catch(error => console.log(error))
            .then(resp => resp.json())
            .then(data => setDataReceived(data))
            
        } else {
            console.log("No match!")
            alert("Passwords entered do not match. Please try again")
        }
        
    }

    const showPassword = () => {
        let element = document.getElementById("reg-pw")
        if (element.type === "password") {
            element.setAttribute("type", "text")
        } else if (element.type === "text") {
            element.setAttribute("type", "password")
        }
        let element2 = document.getElementById("reg-cpw")
        if (element2.type === "password") {
            element2.setAttribute("type", "text")
        } else if (element2.type === "text") {
            element2.setAttribute("type", "password")
        }

    }

    return (
        <>
            <div className="register-container mt-5">

            <form method="POST" onSubmit={handleSubmit}>
                <div className='reg-div flx-c bg-gains see-thru'>
                    <div className="top-box">
                        <h2 className='center-text my-2 white-text'>Start by telling us your name...</h2>
                    </div>
                    <div className='flx-c pad16'>
                    <label htmlFor="nm" className="form-label m0 left-text">&nbsp;<strong>What should we call you?</strong></label>
                    <input name="name" className='form-input2' type="text" placeholder="Enter your name..." />
                    <label htmlFor="un" className="form-label m0 left-text">&nbsp;<strong>Create your Username (not case sensitive):</strong></label>
                    <input name="username" className='form-input2' type="text" placeholder="Create a Username" />
                    <div className="my-2">
                        <input value="male" name="sex" id="male" className='radio mx-2' type="radio" />
                        <label htmlFor="male">Male</label>
                        <input value="female" name="sex" id="female" className='radio mx-2' type="radio" />
                        <label htmlFor="female">Female</label>
                        <input value="noAnswer" name="sex" id="noanswer" className='radio mx-2' type="radio" />
                        <label htmlFor="noanswer">No Answer</label>
                    </div>
                    <label htmlFor="em" className="form-label m0 left-text">&nbsp;<strong>We promise we won't spam you:</strong></label>
                    <input name="email" className='form-input2' type="email" placeholder="Enter your Email" />
                    <label htmlFor="pw" className="form-label m0 left-text">&nbsp;<strong>Create and confirm your password:</strong></label>
                    <input name="password" className='form-input2' id="reg-pw" type="password" placeholder="Create a Password" />
                    <input name="confirmPassword" className='form-input2 mt-1' id="reg-cpw" type="password" placeholder="Confirm Password" />
                    <div>
                    <input id="show-password" type="checkbox" onClick={()=> showPassword()} />
                    <label id="sp-label" htmlFor="show-password">Show Password</label>
                    </div>
                    <div className='pad28'>
                        <button className='dark-btn center'>Register</button>
                        <p className='center-text mb-0 uline'><Link className="black-text mt-3" to="/login">Already have an account?</Link></p>
                        <button className='white-btn center' onClick={toLoginPage}>Go To Login</button>
                    </div>
                    </div>
                </div>
                </form>
            </div>
            <div className="card-empty"></div>
        </>
    )
}
export default Register;