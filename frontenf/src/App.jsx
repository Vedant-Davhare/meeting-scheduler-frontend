import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Navbar from "./Components/Navbar";
import ScheduleMeeting from "./Components/ScheduleMeeting";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpcomingMeetings from "./Components/UpcomingMeetings";
function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/upcomingmeetings" element={<UpcomingMeetings />} />
          <Route path="/schedule-meeting" element={<ScheduleMeeting />} />
        </Routes>
      </AuthProvider>
       <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}

export default App;
