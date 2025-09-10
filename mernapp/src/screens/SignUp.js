import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const SignUp = () => {
    const [credential, setcredential] = useState({ name: "", email: "", password: "", geolocation: "" })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://my-gofoody-backend.onrender.com/api/CreatUser", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password, location: credential.geolocation })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            //save the auth toke to local storage and redirect
            localStorage.setItem('authToken', json.authToken)
            navigate("/login")

        }
        else {
            alert('Enter Valid Credential')
        }
    }

    const onChange = (event) => {
        setcredential({ ...credential, [event.target.name]: event.target.value })
    }
    return (
        <>
            <div className='container '>
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credential.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credential.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credential.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credential.geolocation} onChange={onChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to='/login' className='m-3 mx-1 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </>
    )
}
