import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
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
        {
          withCredentials: true, // allow cookies to be set
        }
      );

      // console.log(res);
    
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        // console.log(res.data.data);

        localStorage.setItem("user", res.data.data.name);
        localStorage.setItem("islogin", res?.data?.success);
        setUser(res.data.data);
        navigate("/home");
      }
      // setMessage(res.data.message);
    } catch (error) {
      toast.error("unable to login ");
      // setMessage(error.response.data.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-80"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="mb-3 p-2 border w-full"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mb-3 p-2 border w-full"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className=" cursor-pointer bg-blue-500 text-white p-2 w-full"
        >
          Login
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
