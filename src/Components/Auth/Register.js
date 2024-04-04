import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import db from '../../Firebase';
import Navbar from '../Common/Navbar';

function Register() {
    const [registrationData, setRegistrationData] = useState({
        id: '',
        name: '',
        class: '',
        email: '',
        role: 'administrator',
        username: '',
        password: ''
    });


   const redirToAdDashboard = useRef();
   const redirToDashboard = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistrationData({
            ...registrationData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can perform your registration logic
        console.log("Registration data:", registrationData);

        db.collection(registrationData.role).doc(registrationData.email).set(registrationData)
        window.localStorage.setItem("omr-Id",registrationData.email)
        window.localStorage.setItem("role",registrationData.role)
        console.log(registrationData.username)
        console.log("Done")
    };

    useEffect(() => {
        console.log(registrationData)
        if(window.localStorage.getItem("omr-Id")){
            if(window.localStorage.getItem("role")==="administrator"){
                redirToAdDashboard.current.click();
            }else if (window.localStorage.getItem("role")==="student"){
                redirToDashboard.current.click();
            }
        }
    }, [registrationData]);

    return (
        <div>
        <Navbar/>
            <div className="login-container">
                <div className="login-form">
                    <h2>Registration</h2>
                    <form onSubmit={handleSubmit}>
                        {/* <label htmlFor="id">ID</label> */}
                        {/* <input type="text" id="id" name="id" value={registrationData.id} onChange={handleChange} /> */}
<br/>
                        <label htmlFor="role">Role</label>
                        <select className="input" id="role" name="role" value={registrationData.role} onChange={handleChange}>
                            <option value="administrator">Administrator</option>
                            <option value="student">Student</option>
                        </select>

                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={registrationData.name} onChange={handleChange} />

                        <label htmlFor="name">Class</label>
                        <input type="text" id="class" name="class" value={registrationData.class} onChange={handleChange} />

                        <label htmlFor="email">Email </label><br/>
                        <input type="email" id="email" name="email" value={registrationData.email} onChange={handleChange} />
<br/>
                        <br/>

                        {/* <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" value={registrationData.username} onChange={handleChange} /> */}

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={registrationData.password} onChange={handleChange} />

                        <button type="submit" className="btn btn-dark">Register</button>
                        <Link ref={redirToAdDashboard} to="/teacherdash"></Link><Link ref={redirToDashboard} to="/dashboard"></Link>
                        <p className="forgot-password">Already registered? <Link to="/login">Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;