import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logo from "../assets/Logo.webp";
import BackgroundImg from "../assets/classroom.webp";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData,
        { withCredentials: true }
      );

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        localStorage.setItem("user", res.data.data.name);
        localStorage.setItem("islogin", res?.data?.success);
        setUser(res.data.data);
        navigate("/home");
      }
    } catch (error) {
      toast.error("unable to login ");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden">
      {/* Blurred Background Image */}
      <img
        src={BackgroundImg}
        alt="Classroom Background"
        className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
        style={{ zIndex: -1 }}
      />

      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-[#9AB300] to-[#BCEB11] p-10 rounded-3xl shadow-2xl w-full max-w-lg min-h-[500px] transition-all duration-300"
      >

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={Logo}
            alt="Logo"
            className="w-32 h-auto object-contain"
            style={{ filter: "drop-shadow(0 0 4px #91C81F)" }}
          />
        </div>

        <h2 className="text-3xl font-extrabold mb-6 text-center text-white drop-shadow-sm tracking-wide">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="mb-4 p-3 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-white bg-white bg-opacity-80"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mb-6 p-3 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-white bg-white bg-opacity-80"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="cursor-pointer bg-[#222E48] hover:bg-[#1a2337] transition-colors duration-200 text-white p-3 w-full rounded-md font-semibold shadow-md"
        >
          Login
        </button>

        {message && (
          <p className="mt-4 text-center text-red-600 font-medium">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
