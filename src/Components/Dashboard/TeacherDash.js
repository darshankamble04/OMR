import React, { useContext, useEffect, useState } from "react";
import "./TeacherDash.css";
import Temp from "../../Temp";
import Navbar from "../Common/Navbar";
import plus from "../../assets/img/plus.png";
import DataContext from "../../context/DataContext";
import db from "../../Firebase";
const TeacherDash = ({ name, title }) => {
  // Update the renderTestBoxes function
  const context = useContext(DataContext);
  const { data, setData, generateRandomString, userProfile, getUserProfile } =
    context;
  const [testD, setTestD] = useState({
    testName: "",
    subName: "",
    class: "",
    data: [],
    timestamp: new Date(),
  });

  const [tests, settests] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestD({
      ...testD,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomString = generateRandomString();
    const flattenedTestD = {
      ...testD,
      id: randomString,
      teacherEmail: userProfile.email,
      teacherName: userProfile.name,
      data: testD.data.flat(), // Flatten the nested array
    };
    // Set the flattened data in Firestore
    db.collection("tests").doc(randomString).set(flattenedTestD);
    console.log(tests);
  };

  const renderTestBoxes = () => {
    if (!tests) return;
    return tests.map(
      (test, index) =>
        test && (
          <div className="test-box" key={index}>
            <p>Test Name :{test.testName}</p>
            <p>Teacher Name :{test.teacherName}</p>
            <p>Subject Name :{test.subName}</p>
            <p>Test id :{test.id}</p>
            <p>class id :{test.class}</p>
            {/* You can add other properties if necessary */}
            <button className="btn btn-primary analyse-btn">Analyse</button>
          </div>
        )
    );
  };

  useEffect(() => {
    getUserProfile();
    setTestD({
      ...testD,
      data: data,
    });
    // console.log(testD);

    db.collection("tests").onSnapshot((snapshot) => {
      settests(
        snapshot.docs.map((doc) => {
          console.log(doc.data());
          if (
            doc
              .data()
              .teacherEmail.includes(window.localStorage.getItem("omr-Id"))
          ) {
            return doc.data();
          }
        })
      );
    });

    console.log(tests);
  }, [data]);

  return (
    <>
      <Navbar />
      <div className="welcome-container">
        <div className="welcome-message">
          <p style={{fontSize:"50px"}}>
            Welcome, <span className="welcome-name">Vrunda Mahajan!</span>
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
                <div class="modal-body">...</div>
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
        <button
          type="button"
          className="add-test-btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <span class="material-symbols-outlined">add</span>
        </button>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Create Test
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <label className="mx-2" htmlFor="testName">
                  Test name{" "}
                </label>
                <input
                  type="text"
                  id="testName"
                  name="testName"
                  value={testD.testName}
                  onChange={handleChange}
                />
                <br />
                <br />
                <label className="mx-2" htmlFor="subName">
                  Subject name{" "}
                </label>
                <input
                  type="text"
                  id="subName"
                  name="subName"
                  value={testD.subName}
                  onChange={handleChange}
                />
                <br />
                <br />
                <label className="mx-2" htmlFor="class">
                  Class{" "}
                </label>
                <input
                  type="text"
                  id="class"
                  name="class"
                  value={testD.class}
                  onChange={handleChange}
                />
                <br />
                <br />
                <label className="mx-2" htmlFor="username">
                  Answer Key{" "}
                </label>
                <Temp data={setData} />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  onClick={handleSubmit}
                  class="btn btn-dark"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="test-container">
        <div className="flex-container">{renderTestBoxes()}</div>
      </div>
    </>
  );
};

export default TeacherDash;
