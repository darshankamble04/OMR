import React from 'react'
import './landing.css'
import sudo from '../../assets/img/sudo.png'
import { Link } from 'react-router-dom'
import Temp from '../../Temp'

function Landing() {
    return (
        <div className='landing d-center flex-c'>
            <div className='main1 d-flex h-center '>
                <header className='section1 '>
                    <div class="header">
                        <h1>Instant Evaluation <span style={{ color: "#6a7281" }}>with <br /> Teacherly</span></h1>
                    </div>
                    <div class="slogan">
                        <p >Unlock Your Potential with Instant Evaluation!</p>
                    </div>
                    <div className='main2'>
                        <button type="button" class="btn btn-light"> <Link to="/registration">Register</Link> </button>
                        <button type="button" class="btn btn-dark mx-3"><Link to="/login">Login</Link></button>
                    </div>
                </header>
                <div className='section2'>
                    <img
                        src={sudo}
                        // width="960"
                        // height="540"
                        alt="Image"
                        class="aspect-video rounded-xl overflow-hidden object-cover object-center"
                    />
                </div>
            </div>
            <div className='main2 mt-5'>
                <Temp></Temp>
            </div>
        </div>
    )
}

export default Landing