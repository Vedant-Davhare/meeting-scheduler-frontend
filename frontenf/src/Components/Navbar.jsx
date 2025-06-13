import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.webp";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("islogin");
    localStorage.removeItem("Role");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setUser({});
    navigate("/");
  };

  const username = localStorage.getItem("user"); // ✅ Make sure username is stored here

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl fixed w-full z-50">
      {/* Logo */}
      <Link to="/home" className="flex items-center space-x-3">
        <img src={Logo} alt="Logo" className="h-10 w-auto object-contain rounded-md shadow-sm" />
        <span className="text-xl font-bold tracking-wide hidden sm:inline">Meeting Scheduler</span>
      </Link>

      {/* Menu */}
      <div className="flex items-center space-x-6">
        {/* Show username */}
        {username && (
          <div className="flex items-center bg-white/20 px-3 py-1 rounded-full shadow hover:scale-105 transition duration-200">
            <div className="w-8 h-8 bg-white text-indigo-600 font-bold rounded-full flex items-center justify-center mr-2">
              {username.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-semibold">{username}</span>
          </div>
        )}

        {/* Conditional Button */}
        {(localStorage.getItem("Role") === "LEADERSHIP" ||
          localStorage.getItem("Role") === "TEAMLEAD") && (
          <Link
            to="/schedule-meeting"
            className="bg-white text-indigo-700 hover:bg-indigo-100 font-semibold py-2 px-4 rounded-full transition-all duration-200 shadow"
          >
            + Schedule
          </Link>
        )}

        {/* Logout Button */}
        {localStorage.getItem("islogin") === "true" && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full shadow transition duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
