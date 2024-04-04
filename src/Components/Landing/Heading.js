import React from 'react'
import './Heading.css'
import animation from "./animation.json";
import lottie from "lottie-react"
import Lottie from 'lottie-react';
export default function Heading() {
  return (
        <>
            <div className="container1">
                <div className="compart1">
                    <div className="teacherly">Instant Evaluation <span className="teacherlystyl">with TEACHERLY</span></div>
                    <div className="describe1">Unlock Your Potential with Instant Evaluation!</div>
                    <div className="describe2">Welcome to our innovative platform where your answer sheets come to life! Simply upload your work, sit back, and watch as our cutting-edge evaluation system provides you with detailed feedback in no time. Say goodbye to waiting and hello to instant insights. Start your journey to success today!"
                        <br />
                        <button className="btn getstarted">Get Started</button>
                    </div>
                    
                </div>
                <div className="compart2">
                    <Lottie animationData={animation}/>
                </div>
            </div>
        </>
  )
}
