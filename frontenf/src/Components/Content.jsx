// components/Content.jsx
import React from "react";
import UpcomingMeetings from "./UpcomingMeetings";

const Content = ({ selectedTab }) => {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-semibold mb-4">{selectedTab}</h1>
      <div className="bg-white shadow-md rounded p-4">
        {/* Add real content per tab here */}
        {selectedTab === "Dashboard" && <UpcomingMeetings/>}
        {selectedTab === "Meetings" && <p>Here are your meetings.</p>}
        {selectedTab === "Notifications" && <p>You have new notifications.</p>}
        {selectedTab === "Settings" && <p>Adjust your settings here.</p>}
      </div>
    </div>
  );
};

export default Content;
