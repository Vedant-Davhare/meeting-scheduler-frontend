import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Navbar from "./Components/Navbar";
import ScheduleMeeting from "./Components/ScheduleMeeting";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/schedule-meeting" element={<ScheduleMeeting />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
