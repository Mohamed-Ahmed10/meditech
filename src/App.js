import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import HomePage from "./components/Pages/home-page/HomePage";
import Login from "./components/Pages/Login/Login.jsx";
import Patients from "./components/Pages/Patients/Patients";
import Profile from "./components/Pages/Profile/Profile";
import Schedule from "./components/Pages/schedule-page/Schedule";

function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="login" element={<Login />} />
    <Route path="schedule" element={<Schedule />} />
    <Route path="profile" element={<Profile />} />
    <Route path="patients/:patientId" element={<Patients />} />
    </Routes>
    </Router>
  );
}

export default App;
