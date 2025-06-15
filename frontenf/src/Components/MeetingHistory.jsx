import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

function MeetingHistory() {
  const [attendedMeetings, setAttendedMeetings] = useState([]);
  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const role = localStorage.getItem("Role") || localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  // Format date as "Jun 15, 2025"
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      // Parse date in YYYY-MM-DD format
      const [year, month, day] = dateStr.split('-');
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      console.error("Invalid date:", dateStr);
      return "Invalid date";
    }
  };

  // Enhanced time formatter that handles both formats:
  // 1. Pure time strings (HH:mm:ss) from attended meetings
  // 2. Full datetime strings from scheduled meetings
  const formatTime = (timeStr) => {
    if (!timeStr) return "N/A";
    
    try {
      let timePart = timeStr;
      
      // If it's a full datetime string (from scheduled meetings)
      if (timeStr.includes('T') || timeStr.includes(' ')) {
        // Extract just the time portion
        const dt = new Date(timeStr);
        timePart = dt.toTimeString().substring(0, 8); // Gets "HH:mm:ss"
      }
      
      // Now handle the time portion (HH:mm:ss)
      const [hours, minutes] = timePart.split(':').map(Number);
      
      if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        throw new Error("Invalid time format");
      }
      
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12AM
      return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    } catch (e) {
      console.error("Error formatting time:", timeStr, e);
      return "Invalid time";
    }
  };

  useEffect(() => {
    const fetchMeetingData = async () => {
      if (!userId) {
        toast.error("User ID not found.");
        return;
      }

      try {
        // Fetch attended meetings (returns TIME() formatted strings)
        const attendedRes = await axios.get(
          `http://localhost:8080/api/meetings/attended/history/${userId}`,
          { withCredentials: true }
        );
        setAttendedMeetings(attendedRes.data || []);

        // Fetch scheduled meetings (returns full datetime strings)
        if (role !== "EXECUTIVE") {
          const scheduledRes = await axios.get(
            `http://localhost:8080/api/meetings/schedule/history/${userId}`,
            { withCredentials: true }
          );
          setScheduledMeetings(scheduledRes.data || []);
        }
      } catch (error) {
        toast.error("Error fetching meetings data");
        console.error("API Error:", error.response?.data || error.message);
      }
    };

    fetchMeetingData();
  }, [role, userId]);

  const renderMeetingCard = (meeting, index) => (
    <motion.div
      key={meeting.meetingId || index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-gray-50 shadow rounded-xl p-4 mb-4 border hover:bg-green-400/10"
    >
      <h2 className="text-lg font-bold text-[#091c51]">{meeting.title || "No title"}</h2>
      <p className="text-sm text-gray-600">
        <strong>Description:</strong> {meeting.description || "N/A"}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Date:</strong> {formatDate(meeting.meetingDate)}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Time:</strong> {formatTime(meeting.startTime)} - {formatTime(meeting.endTime)}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Room:</strong> {meeting.roomName || "N/A"}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Host:</strong> {meeting.hostName || "N/A"}
      </p>
    </motion.div>
  );

  return (
    <div className="flex flex-col md:flex-row h-[90vh] gap-4 p-4">
      {/* Attended Meetings Section */}
      <div className={`${role === "EXECUTIVE" ? "w-full" : "md:w-1/2"} overflow-y-auto border p-4 rounded-lg shadow-sm bg-white`}>
        <h1 className="text-xl font-semibold mb-4 text-[#091c51]">
          Attended Meetings
        </h1>
        {attendedMeetings.length > 0 ? (
          attendedMeetings.map(renderMeetingCard)
        ) : (
          <p className="text-center text-gray-500 py-4">
            No attended meetings found
          </p>
        )}
      </div>

      {/* Scheduled Meetings Section */}
      {role !== "EXECUTIVE" && (
        <div className="md:w-1/2 overflow-y-auto border p-4 rounded-lg shadow-sm bg-white">
          <h1 className="text-xl font-semibold mb-4 text-[#091c51]">
            Scheduled Meetings
          </h1>
          {scheduledMeetings.length > 0 ? (
            scheduledMeetings.map(renderMeetingCard)
          ) : (
            <p className="text-center text-gray-500 py-4">
              No scheduled meetings found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default MeetingHistory;