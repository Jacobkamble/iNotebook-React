import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

export default function Signup() {

  const context = useContext(NoteContext);
  const { showAlert } = context;

  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/api/auth/createuser`;
    const response = await fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    },
    )

    const json = await response.json();

    if (json.success) {
      // save the auth token to localstorage and redirect
      // localStorage.setItem("token", json.authtoken);
      navigate("/login");
      showAlert("Account Created Successfully...!!!", 'success');
    }
    else {
      showAlert("Please Enter Valid Details...!!!", 'danger');
    }
  }

  return (
    <>
      <div className='container mt-2'>
        <h3>Create an account to use iNotebook</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <label htmlFor="name" className="form-label">Name</label>
            <input required minLength={5} onChange={onChange} value={credentials.name} name='name' id='name' type="text" className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-1">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input required onChange={onChange} value={credentials.email} name='email' id='email' type="email" className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-1">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input required minLength={5} onChange={onChange} value={credentials.password} name='password' type="password" className="form-control" id="password" />
          </div>

          <div className="mb-1">
            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
            <input required minLength={5} onChange={onChange} value={credentials.setCredentials} name='cpassword' type="password" className="form-control" id="cpassword" />
          </div>

          <button type="submit" className="mt-2 btn btn-danger">Create Account</button>
        </form>
      </div>
    </>
  )
}
