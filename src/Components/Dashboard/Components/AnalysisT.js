import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../../context/DataContext";
import db from "../../../Firebase";
import { useParams } from "react-router-dom";

function AnalysisT() {
  const [tests, setTests] = useState([]);
  const [x, setx] = useState({param1:"",param2:""});
  const { getUserProfile, userProfile } = useContext(DataContext);
  //   const { param1, param2 } = useParams();
  var url = window.location.pathname;

  // Get the pathname which contains the parameters
//   var pathname = url.pathname || "";
  // Split the pathname into an array of parts
    var parts = url.split("/");

    // Extract the parameters
    var param1 = parts[2];
    var param2 = parts[3];

  useEffect(() => {
    getUserProfile();

    const unsubscribe = db.collection("tests").onSnapshot((snapshot) => {
      const filteredTests = snapshot.docs
        .map((doc) => doc.data())
        .filter(
          (test) => test.id === param2 || test.class.includes(userProfile.class)
        );
      setTests(filteredTests);
    });

    return () => unsubscribe();
  }, [param2, userProfile.class]);

  return (
    <div>
      hii
      <pre>{tests.stud && JSON.stringify(tests.stud[param1], null, 2)}</pre>
      {tests.map((test, index) => {
           if (test.id === param2) { 
        console.log(test);
        return (
          <div key={index}>
            <p>Test Name: {test.testName}</p>
            <p>Teacher Name: {test.teacherEmail}</p>
            <p>Subject Name: {test.subName}</p>
            <p>Test id: {test.id}</p>
            <p>Class id: {test.class}</p>
          </div>
        );
        
           } 
        
      })}
    </div>
  );
}

export default AnalysisT;
