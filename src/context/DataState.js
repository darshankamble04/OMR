import React, { useState } from "react"
import DataContext from "./DataContext"
import db from "../Firebase";
const DataState = (props) => {

  const [data, setData] = useState([])
  const [scan1, setScan1] = useState({
    ans_marked: "",
    enroll_id: "",
    test_id: "",
  })

  const generateRandomString = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
  
    // Generate random characters
    const char1 = characters.charAt(Math.floor(Math.random() * characters.length));
    const char2 = characters.charAt(Math.floor(Math.random() * characters.length));
  
    // Generate random digits
    const digit1 = digits.charAt(Math.floor(Math.random() * digits.length));
    const digit2 = digits.charAt(Math.floor(Math.random() * digits.length));
  
    // Concatenate characters and digits
    const randomString = `${char1}${char2}${digit1}${digit2}`;
  
    return randomString;
  };

  const [userProfile, setUserProfile] = useState([])
  const getUserProfile = () => {
      db.collection(window.localStorage.getItem("role")).doc(window.localStorage.getItem("omr-Id")).onSnapshot(snapshot => {
          setUserProfile(snapshot.data())
      })

  }
  return (
    <DataContext.Provider value={{ data, setData, generateRandomString, userProfile,getUserProfile, scan1, setScan1}}>
      {props.children}
    </DataContext.Provider>
  )
}

export default DataState;