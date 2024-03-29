import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import ContactUs from "./Components/Common/ContactUs";
import AboutUs from "./Components/Common/AboutUs";
import Dashboard from "./Components/Dashboard/Dashboard";
import Landing from "./Components/Landing/Landing";
import AdDashboard from "./Components/Dashboard/AdDashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route Exact path="/" element={<Landing />}></Route>
          <Route Exact path="/login" element={<Login />}></Route>
          <Route Exact path="/registration" element={<Register />}></Route>
          <Route Exact path="/dashboard" element={<Dashboard />}></Route>
          <Route Exact path="/ad-dashboard" element={<AdDashboard/>}></Route>
          <Route Exact path="/about-us" element={<AboutUs />}></Route>
          <Route Exact path="/contact-us" element={<ContactUs />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
