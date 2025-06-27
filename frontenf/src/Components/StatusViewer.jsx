import React, { useEffect, useState } from "react";
import axios from "axios";

const UpcomingAttendeeStatus = () => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const hostId = localStorage.getItem("userId");

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:8080/api/meetings/upcoming-attendees/status/${hostId}`
      )
      .then((response) => {
        if (response) {
          console.log(response.data);
          setAttendees(response.data);
          setLoading(false);
        }
      });
  }, [hostId]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACCEPTED":
        return { color: "green", fontWeight: "bold" };
      case "PENDING":
        return { color: "orange", fontWeight: "bold" };
      case "REJECTED":
        return { color: "red", fontWeight: "bold" };
      default:
        return {};
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4  overflow-x-auto md:max-h-[450px] sm:min-h-[50%] border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        Upcoming Meeting Attendee Status
      </h2>
      <table className="w-full border border-gray-300 text-left overflow-y-scroll h-30  ">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Meeting ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Start Time</th>
            <th className="border px-4 py-2">Attendee</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody className="overflow-x-auto max-h-[400px]">
          {attendees.map((a, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{a.meetingId}</td>
              <td className="border px-4 py-2">{a.meetingTitle}</td>
              <td className="border px-4 py-2">{a.meetingDate}</td>
              <td className="border px-4 py-2">{a.startTime}</td>
              <td className="border px-4 py-2">{a.username}</td>
              <td
                className="border px-4 py-2"
                style={getStatusStyle(a.invitationStatus)}
              >
                {a.invitationStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingAttendeeStatus;
