import React from 'react'
import './Working.css'
import logingif from './login.gif';
import uploadgif from './upload.gif';
import examgif from './exam.gif';
export default function Working() {
  return (
    <>
        <div className="work">
            <div className="work-heading">How It Works</div>
            <div className="container my-5">
                <div className="work-step">
                    <img src={logingif} alt="My cool gif" style={{height:"70%"}}/>
                    <div className="work-step-describe">Login with your account</div>
                </div>
                <div className="work-step">
                    <img src={uploadgif} alt="My cool gif" style={{height:"70%"}}/>
                    <div className="work-step-describe">Upload your answer sheet</div>
                </div>
                <div className="work-step">
                    <img src={examgif} alt="My cool gif" style={{height:"70%"}}/>
                    <div className="work-step-describe">Get detailed  evaluation </div>
                </div>
            </div>
        </div>
    </>
  )
}
