import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { Link} from 'react-router-dom';
import db from '../../Firebase';




function Login() {


    const [data, setData] = useState({})

    const [loginData, setLoginData] = useState({
        role: 'administrator',
        username: '',
        password: ''
    });

   const redirToAdDashboard = useRef();
   const redirToDashboard = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can perform your login logic
        console.log("Login data:", loginData);
        db.collection(loginData.role).doc(loginData.username).onSnapshot(snapshot => {
            setData(snapshot.data())
            console.log(snapshot)
        })
        console.log(data)
    };
    useEffect(() => {
        console.log(loginData)
        try {
            if (data.password) {
                if (loginData.password === data.password) {
                    window.localStorage.setItem("omr-Id",loginData.username)
                    window.localStorage.setItem("role",loginData.role)
                    console.log(loginData.username)
                }
                else {
                    console.log("login fail")
                }
            }
        } catch (error) {
            console.log("login fail", error)
        }

        if(window.localStorage.getItem("omr-Id")){
            if(window.localStorage.getItem("role")==="administrator"){
                redirToAdDashboard.current.click();
            }else if (window.localStorage.getItem("role")==="student"){
                redirToDashboard.current.click();
            }
        }
            
    }, [data])

    return (
        <div>
            <div className="login-container">
                <div className="login-form">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="role">Role</label>
                        <select className="input" id="role" name="role" value={loginData.role} onChange={handleChange}>
                            <option value="administrator">Administrator</option>
                            <option value="student">Student</option>
                        </select>

                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" value={loginData.username} onChange={handleChange} />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={loginData.password} onChange={handleChange} />

                        <button type="submit" class="btn btn-dark">Login</button>
                        <Link ref={redirToAdDashboard} to="/ad-dashboard"></Link><Link ref={redirToDashboard} to="/dashboard"></Link>
                        <p className="forgot-password">New user?<Link to="/registration">Register</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

