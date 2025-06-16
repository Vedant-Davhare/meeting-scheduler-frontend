import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
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
  });

  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, roomsRes] = await Promise.all([
          axios.get("http://localhost:8080/api/users/all", {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }),
          axios.get("http://localhost:8080/api/rooms", {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }),
        ]);

        const allUsers = usersRes?.data?.data || [];
        const filteredUsers = allUsers.filter((u) => u.id !== user?.id);
        setUsers(filteredUsers);

        setRooms(roomsRes?.data?.data || []);
      } catch (err) {
        console.error("Error fetching users or rooms:", err);
        toast.error("Failed to load user or room data.");
      }
    };

    fetchData();
  }, [user?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleUserSelection = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const inviteAllUsers = () => {
    setSelectedUsers(users.map((u) => u.id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startString = `${formData.date}T${formData.startTime}:00`;
    const endString = `${formData.date}T${formData.endTime}:00`;
    const start = new Date(startString);
    const end = new Date(endString);
    const now = new Date();

    if (start < now) {
      toast.error("Start time cannot be in the past.");
      return;
    }

    if (end <= start) {
      toast.error("End time must be after start time.");
      return;
    }

    if (selectedUsers.length === 0) {
      toast.error("Please invite at least one person.");
      return;
    }

    const payload = {
      title: formData.meetingTitle,
      description: formData.meetingDescription,
      startTime: startString,
      endTime: endString,
      roomId: parseInt(formData.roomId),
      attendeeIds: selectedUsers,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/meetings/book",
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Meeting Scheduled Successfully!");
        navigate("/home");
      } else {
        console.warn("Unexpected response:", response);
        toast.error("Unexpected server response.");
      }
    } catch (err) {
      console.error("Error scheduling meeting:", err);
      toast.error(err.response?.data?.message || "Failed to schedule meeting.");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-10 pt-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${classroomBg})` }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />
      <div className="relative z-10 bg-white/80 p-10 rounded-2xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">
          Schedule a Meeting
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="meetingTitle"
            value={formData.meetingTitle}
            onChange={handleChange}
            required
            placeholder="Meeting Title"
            className="w-full bg-green-200 text-black px-4 py-2 rounded-lg"
          />

          <textarea
            name="meetingDescription"
            value={formData.meetingDescription}
            onChange={handleChange}
            rows="3"
            required
            placeholder="Meeting Description"
            className="w-full bg-green-200 text-black px-4 py-2 rounded-lg"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            required
            className="w-full bg-green-200 text-black px-4 py-2 rounded-lg"
          />

          <div className="flex gap-4">
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              step="900"
              required
              className="w-full bg-green-200 text-black px-4 py-2 rounded-lg"
            />
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              step="900"
              required
              className="w-full bg-green-200 text-black px-4 py-2 rounded-lg"
            />
          </div>

          <select
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
            required
            className="w-full bg-green-200 text-black px-4 py-2 rounded-lg"
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>

          <div>
            <button
              type="button"
              onClick={() => setShowInviteModal(true)}
              className="w-full bg-yellow-300 text-black px-4 py-2 rounded-lg hover:bg-yellow-400"
            >
              Invite People
            </button>
            {selectedUsers.length > 0 && (
              <p className="text-sm text-green-700 mt-1">
                Invited {selectedUsers.length} people
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-lg font-medium bg-blue-700 text-white hover:bg-blue-900"
          >
            Schedule Meeting
          </button>
        </form>
      </div>

      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <h3 className="text-xl font-bold mb-4">Select People to Invite</h3>
              <div className="max-h-60 overflow-y-auto space-y-2 mb-4">
                {users.map((u) => (
                  <label key={u.id} className="block">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(u.id)}
                      onChange={() => toggleUserSelection(u.id)}
                      className="mr-2"
                    />
                    {u.name}
                  </label>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={inviteAllUsers}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Invite All
                </button>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScheduleMeeting;
