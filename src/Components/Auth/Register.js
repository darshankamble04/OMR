import React, { useEffect, useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import db from '../../Firebase';

function Register() {
    const [registrationData, setRegistrationData] = useState({
        id: '',
        name: '',
        email: '',
        role: 'administrator',
        username: '',
        password: ''
    });

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
        console.log("Done")
    };

    useEffect(() => {
        console.log(registrationData)
    }, [handleChange]);

    return (
        <div>
            <div className="login-container">
                <div className="login-form">
                    <h2>Registration</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="id">ID</label>
                        <input type="text" id="id" name="id" value={registrationData.id} onChange={handleChange} />

                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={registrationData.name} onChange={handleChange} />

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={registrationData.email} onChange={handleChange} />
<br/>
                        <label htmlFor="role">Role</label>
                        <select className="input" id="role" name="role" value={registrationData.role} onChange={handleChange}>
                            <option value="administrator">Administrator</option>
                            <option value="student">Student</option>
                        </select>

                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" value={registrationData.username} onChange={handleChange} />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={registrationData.password} onChange={handleChange} />

                        <button type="submit" className="btn btn-dark">Register</button>

                        <p className="forgot-password">Already registered? <Link to="/login">Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;