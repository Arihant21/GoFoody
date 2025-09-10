import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [credential, setcredential] = useState({ email: "", password: "" })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://my-gofoody-backend.onrender.com/api/loginUser", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credential.email, password: credential.password })
    });
    const json = await response.json()
    console.log(json);

    if (json.success) {
      localStorage.setItem("userEmail", credential.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }

    if (!json.success) {
      alert('Enter Valid Credential');
    }

  }

  const onChange = (event) => {
    setcredential({ ...credential, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <div className='container '>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credential.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credential.password} onChange={onChange} id="exampleInputPassword1" />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to='/creatuser' className='m-3 btn btn-danger'> New User</Link>
        </form>
      </div>
    </div>
  )
}
