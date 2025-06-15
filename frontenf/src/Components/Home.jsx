
// pages/Home.jsx or Home.js
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import UpcomingMeetings from "./UpcomingMeetings";
import MeetingHistory from "./MeetingHistory";
import Content from './Content'
const Home = () => {
  const [selectedTab, setSelectedTab] = useState("Upcoming Meetings");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      <Content selectedTab={selectedTab} />
    </div>
  );
};

export default Home;
