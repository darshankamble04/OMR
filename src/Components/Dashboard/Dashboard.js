import React, { useContext, useEffect, useState } from "react";
import "./TeacherDash.css";
import Temp from "../../Temp";
import Navbar from "../Common/Navbar";
import plus from "../../assets/img/plus.png";
import DataContext from "../../context/DataContext";
import db from "../../Firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const Dashboard = ({ name, title }) => {
  // Update the renderTestBoxes function
  const context = useContext(DataContext);
  const {
    data,
    setData,
    generateRandomString,
    userProfile,
    getUserProfile,
    scan1,
    setScan1,
  } = context;

  const [tests, settests] = useState();

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (id) => {
    console.log(id);
    if (!file) {
      alert("Please select a file");
      return;
    }

    db.collection("tests")
      .doc(id)
      .onSnapshot((snapshot) => {
        setData(snapshot.data().data);
        // console.log(snapshot.data().data)
      });

    const formData = new FormData();
    formData.append("answerSheet", file);

    try {
      // Send file to backend for processing
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      // Process response from backend
      const result = await response.json();
      console.log(result.result);
      const scan = result.result;
      setScan1(result.result);
      db.collection("tests")
        .doc(id)
        .update({
          stud: firebase.firestore.FieldValue.arrayUnion({
            studEmail: window.localStorage.getItem("omr-Id"),
            result: {
              ans_marked: scan.ans_marked.flat(),
              enroll_id: scan.enroll_id.flat(),
              test_id: scan.test_id.flat(),
            },
          }),
        });
      if (!data){handleSubmit(id)};


      console.log("AnswerKey: ", data);
      console.log("AnswerSheet: ", scan);


      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getUserProfile();
    // console.log(userProfile);
    // console.log(userProfile.class);

    db.collection("tests").onSnapshot((snapshot) => {
      settests(
        snapshot.docs.map((doc) => {
          if (doc.data().class.includes(userProfile.class)) {
            return doc.data();
          }
        })
      );
    });

    // console.log(tests);
  }, [tests]);

  return (
    <>
      <Navbar />
      <div className="welcome-container">
        <div className="welcome-message">
          <p>
            Welcome, <span className="welcome-name">{name}!</span>
          </p>
          <button
            type="button"
            className="avatar-modal-btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal2"
          >
            <span class="material-symbols-outlined">account_circle</span>
          </button>
          <div
            class="modal fade"
            id="exampleModal2"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Modal title
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <pre>{JSON.stringify(userProfile, null, 2)}</pre>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="testHeading">
        <span className="confused">Tests</span>
      </div>
      <div className="test-container">
        <div className="flex-container">
          {tests &&
            tests.map(
              (test, index) =>
                test &&
                test.class === userProfile.class && (
                  <div className="test-box" key={index}>
                    <p>Test Name :{test.testName}</p>
                    <p>Teacher Name :{test.teacherEmail}</p>
                    <p>Subject Name :{test.subName}</p>
                    <p>Test id :{test.id}</p>
                    <p>class id :{test.class}</p>
                    {/* You can add other properties if necessary */}

                    <input type="file" onChange={handleFileChange} />
                    <button onClick={() => handleSubmit(test.id)}>
                      Upload
                    </button>

                    {/* <button className="btn btn-primary analyse-btn">
                      Analyse
                    </button> */}
                  </div>
                )
            )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
