import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext';

export default function Login() {

    const context = useContext(NoteContext);
    const {getUserdata, showAlert } = context;

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }



    const handleSubmit = async (e) => {
        
        e.preventDefault();
        const url = `http://localhost:5000/api/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        },
        )

        const json = await response.json();

        if (json.success) {
            // save the auth token to localstorage and redirect
            localStorage.setItem("token", json.authtoken);
            navigate("/");
            showAlert("Login Successfully...!!!", 'primary');
            getUserdata();
        }
        else {
            showAlert("Please Enter valid email and password...!!!", 'danger')
        }
    }

    return (
        <>
            <div className='container mt-1'>
                <h3>Login to continue to iNotebook</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-1">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input onChange={onChange} value={credentials.email} name='email' id='email' type="email" className="form-control" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={onChange} value={credentials.password} name='password' type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="mt-2 btn btn-danger">Submit</button>
                </form>
            </div>
        </>
    )
}
