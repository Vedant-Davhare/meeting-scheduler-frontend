import React from "react";
import UpcomingMeetings from "./UpcomingMeetings";
import MeetingHistory from "./MeetingHistory"; // Make sure this component exists
// import UpdateMeeting from "./UpdateMeeting";   // If needed later
import StatusViewer from "./StatusViewer";     // Component that shows attendee status

const Content = ({ selectedTab }) => {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-semibold mb-4">{selectedTab}</h1>
      <div className="bg-white shadow-md rounded p-4">
        {selectedTab === "Upcoming Meetings" && <UpcomingMeetings />}
        {selectedTab === "Meeting History" && <MeetingHistory />}
        {/* {selectedTab === "Update Meeting" && <UpdateMeeting />} */}
        {selectedTab === "Status" && <StatusViewer />}
      </div>
    </div>
  );
};

export default Content;