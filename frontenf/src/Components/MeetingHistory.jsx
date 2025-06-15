



import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

function MeetingHistory() {
  const [attendedMeetings, setAttendedMeetings] = useState([]);
  const [scheduleMeetings, setScheduleMeetings] = useState([]);
  const role = localStorage.getItem("Role") || localStorage.getItem("role"); // Handle case sensitivity
  const userId = localStorage.getItem("userId");

  const getDateTime = (date, time) => new Date(`${date}T${time}`);

  const formatTime = (timeStr) => {
    const date = new Date(`1970-01-01T${timeStr}:00`);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        toast.error("User ID not found.");
        return;
      }

      try {
        const attendedRes = await axios.get(
          `http://localhost:8080/api/meetings/attended/history/${userId}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setAttendedMeetings(attendedRes.data || []);
      } catch (error) {
        toast.error("Error fetching attended meetings");
      }

      // Only fetch scheduled meetings if not EXECUTIVE
      if (role !== "EXECUTIVE") {
        try {
          const scheduleRes = await axios.get(
            `http://localhost:8080/api/meetings/schedule/history/${userId}`,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          setScheduleMeetings(scheduleRes.data || []);
        } catch (error) {
          toast.error("Error fetching scheduled meetings");
        }
      }
    };

    fetchData();
  }, [role, userId]);

  const renderMeetingCard = (meeting, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: i * 0.05 }}
      className="bg-gray-50 shadow rounded-xl p-4 mb-4 border hover:bg-green-400/10"
    >
      <h2 className="text-lg font-bold text-[#091c51]">{meeting.title}</h2>
      <p className="text-sm text-gray-600">
        <strong>Description:</strong> {meeting.description}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Date:</strong> {meeting.date}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Time:</strong> {formatTime(meeting.startTime)} -{" "}
        {formatTime(meeting.endTime)}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Room:</strong> {meeting.roomName}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Host:</strong> {meeting.hostName}
      </p>
    </motion.div>
  );

  return (
    <div className="flex flex-col md:flex-row h-[90vh] gap-4 p-4">
      {/* Attended Meetings Section - Always visible */}
      <div
        className={`${
          role === "EXECUTIVE" ? "w-full" : "md:w-1/2"
        } overflow-y-scroll border p-4 rounded-lg shadow-sm bg-white`}
      >
        <h1 className="text-xl font-semibold mb-4 text-[#091c51]">
          Attended Meetings
        </h1>
        {attendedMeetings.length === 0 ? (
          <p className="text-center text-gray-500">
            No attended meetings found.
          </p>
        ) : (
          attendedMeetings.map(renderMeetingCard)
        )}
      </div>

      {/* Scheduled Meetings Section - Only for TEAMLEAD/LEADERSHIP */}
      {role !== "EXECUTIVE" && (
        <div className="md:w-1/2 overflow-y-scroll border p-4 rounded-lg shadow-sm bg-white">
          <h1 className="text-xl font-semibold mb-4 text-[#091c51]">
            Scheduled Meetings
          </h1>
          {scheduleMeetings.length === 0 ? (
            <p className="text-center text-gray-500">
              No scheduled meetings found.
            </p>
          ) : (
            scheduleMeetings.map(renderMeetingCard)
          )}
        </div>
      )}
    </div>
  );
}

export default MeetingHistory;