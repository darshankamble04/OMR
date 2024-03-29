import React from 'react'
import './dashboard.css'
import avatar from '../../assets/img/avatar.webp'
import Temp from '../../Temp'
function Dashboard() {
  return (
    <div>
      <div class="navbar">
        Navbar
      </div>
      <div class="container">
        <div class="user-info">
          <img src={avatar} alt="User Profile Picture" />
          <h4 className='my-4'>darshankamble04</h4>
          <h6>Name : Darshan Kamble</h6>
          <h6>Class : 3A</h6>
          <h6>Roll No : 14</h6>
          <h6>Email : darshankamble7371@gmail.com</h6>
        </div>
        <div class="dashboard-content d-flex flax-c">
          <div class="box">Box 1</div>
          <div class="box">Box 2</div>
          <button type="button" class=" dotted-box" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add
          </button>



          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                  <label className="mx-2" htmlFor="username">Subject name </label>
                  <input type="text" id="username" name="username" />
                  <br/>
                  <br/>
                  <label className="mx-2" htmlFor="username">Class </label>
                  <input type="text" id="username" name="username" />
                  <br/>
                  <br/>
                  <label className="mx-2" htmlFor="username">Answer Key </label>
                  <Temp/>

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-dark">Publish</button>
                </div>
              </div>
            </div>
          </div>




        </div>
      </div>
    </div>
  )
}

export default Dashboard