import { motion } from "framer-motion";
import { useState } from "react";

const InvitationCard = ({ meeting, onClick }) => {
  const [hide, setHide] = useState(false);

  const handleResponse = (status) => {
    onClick({
      invitationId: meeting.notificationId,
      status,
    });
    setHide(true);
  };

  // Combine date and time to create a full ISO string
  const getDateTime = (date, time) => new Date(`${date}T${time}`);

  const formatTime = (dateObj) =>
    dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const startDateTime = getDateTime(meeting.date, meeting.startTime);
  const endDateTime = getDateTime(meeting.date, meeting.endTime);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto border border-gray-200 ${
        hide ? "hidden" : "block"
      }`}
    >
      <h2 className="text-xl font-bold text-[#091c51] mb-2">
        {meeting.title}
      </h2>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Description:</strong> {meeting.description}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Date:</strong> {meeting.date}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Time:</strong> {formatTime(startDateTime)} -{" "}
        {formatTime(endDateTime)}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Room:</strong> {meeting.roomName}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        <strong>Host:</strong> {meeting.hostName}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => handleResponse("ACCEPTED")}
          className="flex-1 py-2 px-4 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
        >
          Accept
        </button>
        <button
          onClick={() => handleResponse("REJECTED")}
          className="flex-1 py-2 px-4 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          Reject
        </button>
      </div>
    </motion.div>
  );
};

export default InvitationCard;
