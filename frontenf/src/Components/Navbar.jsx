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
    setUser({});
    navigate("/");
  };

  return (
   <nav className="flex justify-between bg-white z-50 items-center fixed w-full h-13 p-3 shadow-lg">
  <Link to="/home">
    <img src={Logo} alt="Logo" className="h-10 w-auto object-contain" />
  </Link>


      <menu className="flex items-center justify-evenly">
        {(user.role === "LEADERSHIP" || user.role === "TEAMLEAD") && (
          <Link
            to={"/schedule-meeting"}
            className="text-white bg-blue-700 mx-5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Schedule Meeting
          </Link>
        )}

        {localStorage.getItem("islogin") === "true" ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 py-2 px-3 rounded"
          >
            Logout
          </button>
        ) : (
          ""
        )}
      </menu>
    </nav>
  );
}

export default Navbar;
