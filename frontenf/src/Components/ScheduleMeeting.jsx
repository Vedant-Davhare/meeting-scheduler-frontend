import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Toast import
import "react-toastify/dist/ReactToastify.css"; // Toast CSS

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
        toast.success(" Meeting Scheduled Successfully!");
        navigate("/home");
      })
      .catch((err) => {
        console.error("Error:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || " Failed to schedule meeting");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-14">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Schedule a Meeting
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Meeting Title</label>
            <input
              type="text"
              name="meetingTitle"
              value={formData.meetingTitle}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Meeting Description
            </label>
            <textarea
              name="meetingDescription"
              value={formData.meetingDescription}
              onChange={handleChange}
              required
              rows="3"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-medium">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Venue</label>
            <select
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
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
            <label className="block mb-1 font-medium">Invite People</label>
            <select
              name="invitedPeople"
              multiple
              value={formData.invitedPeople}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 h-32"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Hold Ctrl (Cmd on Mac) to select multiple people.
            </p>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Schedule Meeting
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
