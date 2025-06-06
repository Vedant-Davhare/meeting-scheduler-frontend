import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import classroomBg from "../assets/classroom.webp";

const ScheduleMeeting = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    meetingTitle: "",
    meetingDescription: "",
    date: "",
    startTime: "",
    endTime: "",
    roomId: "",
    invitedPeople: [],
  });

  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/all", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => setUsers(res?.data?.data || []))
      .catch((err) => console.error("Error fetching users:", err));

    axios
      .get("http://localhost:8080/api/rooms", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => setRooms(res?.data?.data || []))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;

    if (type === "select-multiple") {
      const values = Array.from(selectedOptions, (option) => option.value);
      setFormData((prev) => ({
        ...prev,
        [name]: values,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const startTime = `${formData.date}T${formData.startTime}`;
    const endTime = `${formData.date}T${formData.endTime}`;

    const payload = {
      title: formData.meetingTitle,
      description: formData.meetingDescription,
      startTime: startTime,
      endTime: endTime,
      roomId: parseInt(formData.roomId),
      attendeeIds: formData.invitedPeople
        .map((id) => parseInt(id))
        .filter((id) => !isNaN(id) && id !== null),
    };

    axios
      .post("http://localhost:8080/api/meetings/book", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        toast.success("✅ Meeting Scheduled Successfully!");
        navigate("/home");
      })
      .catch((err) => {
        console.error("Error:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "❌ Failed to schedule meeting");
      });
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-10 pt-16 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${classroomBg})` }}>

      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />

      <div className="relative z-10 bg-white/70 p-10 rounded-xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: "#091c51" }}>
          Schedule a Meeting
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold" style={{ color: "#2e2e2e" }}>
              Meeting Title
            </label>
            <input
              type="text"
              name="meetingTitle"
              value={formData.meetingTitle}
              onChange={handleChange}
              required
              style={{ color: "#010101" }}
              className="w-full bg-[#91C81F] focus:border border-gray-500 text-[#010101] rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" style={{ color: "#2e2e2e" }}>
              Meeting Description
            </label>
            <textarea
              name="meetingDescription"
              value={formData.meetingDescription}
              onChange={handleChange}
              rows="3"
              required
              style={{ color: "#010101" }}
              className="w-full bg-[#91C81F] focus:border border-gray-500 text-[#010101] rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" style={{ color: "#2e2e2e" }}>
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={{ color: "#010101" }}
              className="w-full bg-[#91C81F] focus:border border-gray-500 text-[#010101] rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold" style={{ color: "#2e2e2e" }}>
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                style={{ color: "#010101" }}
              className="w-full bg-[#91C81F] focus:border border-gray-500 text-[#010101] rounded-lg px-4 py-2 focus:outline-none"
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-semibold" style={{ color: "#2e2e2e" }}>
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                style={{ color: "#010101" }}
              className="w-full bg-[#91C81F] focus:border border-gray-500 text-[#010101] rounded-lg px-4 py-2 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold" style={{ color: "#2e2e2e" }}>
              Venue
            </label>
            <select
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              required
              style={{ color: "#010101" }}
              className="w-full bg-[#91C81F] focus:border border-gray-500 text-[#010101] rounded-lg px-4 py-2 focus:outline-none"
            >
              <option value="">Select</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold" style={{ color: "#2e2e2e" }}>
              Invite People
            </label>
            <select
              name="invitedPeople"
              multiple
              value={formData.invitedPeople}
              onChange={handleChange}
              style={{ color: "#010101" }}
              className="w-full bg-[#91C81F] focus:border border-gray-500 text-[#010101] rounded-lg px-4 py-2 focus:outline-none"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Hold Ctrl (Cmd on Mac) to select multiple people.
            </p>
          </div>

          <button
            type="submit"
            className="schedule-btn w-full py-3 rounded-lg text-lg font-medium transition duration-200"
            style={{ backgroundColor: "#d0ef31", color: "#2e2e2e" }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#FF6B6B";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#d0ef31";
              e.currentTarget.style.color = "#2e2e2e";
            }}
          >
            Schedule Meeting
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
