import axios from "axios";
import React, { useState } from "react";

const ScheduleMeeting = () => {
  const [formData, setFormData] = useState({
    meetingTitle: "",
    meetingDescription: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    invitedPeople: [],
  });

  const [submitted, setSubmitted] = useState(false);

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
    // console.log("Meeting Scheduled:", formData);

    axios.post("http://localhost:8080/api/meetings/book",FormData, {
          withCredentials: true, // allow cookies to be set
        }).then((res) => {
      console.log(res);

    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-14">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Schedule a Meeting
        </h2>

        {submitted ? (
          <div className="text-green-600 font-semibold text-center">
            ✅ Meeting Scheduled Successfully!
          </div>
        ) : (
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
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
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
                <option value="alice@example.com">Alice</option>
                <option value="bob@example.com">Bob</option>
                <option value="carol@example.com">Carol</option>
                <option value="dave@example.com">Dave</option>
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
        )}
      </div>
    </div>
  );
};

export default ScheduleMeeting;
