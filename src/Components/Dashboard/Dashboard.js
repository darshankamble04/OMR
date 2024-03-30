import React, { useState } from 'react'
import './dashboard.css'
import avatar from '../../assets/img/avatar.webp'
import Temp from '../../Temp'
function Dashboard() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('answerSheet', file);

    try {
      // Send file to backend for processing
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData
      });

      // Process response from backend
      const result = await response.json(); 
      console.log('Result:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
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
          <div class="box">
                  test 01
                  <input type="file" onChange={handleFileChange} />
                  <button onClick={handleSubmit}>Upload</button>
                  </div>
          <div class="box">Box 2</div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard