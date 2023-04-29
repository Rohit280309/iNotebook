import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import colorContext from '../context/bgColor/colorContext';

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useNavigate();
    const context = useContext(colorContext);
    const { mode } = context;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem("token", json.authToken);
            history("/");
            props.showAlert("Logged in Successfully", "success");
            // console.log(localStorage.getItem("token"))
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className='container my-3' style={{ color: mode === 'light' ? 'black' : 'white' }}>
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text" style={{ color: mode === 'light' ? 'black' : 'white' }}>We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
