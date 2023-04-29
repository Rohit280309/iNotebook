import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import colorContext from '../context/bgColor/colorContext';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
    let history = useNavigate();
    const context = useContext(colorContext);
    const { mode } = context;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://127.0.0.1:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
          });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem("token", json.authToken);
            history("/");
            props.showAlert("Account Created Successfully", "success");
        }
        else{
            props.showAlert("Invalid Details", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <div className='container my-3' style={{ color: mode === 'light' ? 'black' : 'white' }}>
            <h2>Welcome to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} name='email' aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text" style={{ color: mode === 'light' ? 'black' : 'white' }}>We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
                </div>
    
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
