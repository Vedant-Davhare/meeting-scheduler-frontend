import React, { useState } from "react";
import BackgroundImg from "../assets/classroom.webp";


const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("New Meeting");

  const renderContent = () => {
    switch (selectedMenu) {
      case "New Meeting":
        return <p className="text-lg text-[#222E48]">📅 Schedule a New Meeting</p>;
      case "Upcoming Meetings":
        return <p className="text-lg text-[#222E48]">📆 List of Upcoming Meetings</p>;
      case "Invitations":
        return <p className="text-lg text-[#222E48]">✉️ Your Meeting Invitations</p>;
      default:
        return <p className="text-[#222E48]">Select a menu item</p>;
    }
  };

  const notifications = [
    { id: 1, message: 'You have been invited to "Team Sync"' },
    { id: 2, message: '"Project Review" meeting updated' },
    { id: 3, message: '"Client Demo" starts in 30 minutes' },
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden">
      {/* Blurred Background Image */}
      <img
        src={BackgroundImg}
        alt="Classroom Background"
        className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
        style={{ zIndex: -1 }}
      />

      {/* Main Content Layer */}
     <main className="relative top-15 flex min-h-screen w-full bg-gray-100 bg-opacity-90 m-6 rounded-md">
        {/* Sidebar */}
        <aside className="w-64 bg-white p-4 shadow-md">
          <h2 className="text-xl font-bold mb-6 text-[#222E48]">
            Meeting Scheduler
          </h2>
          <ul className="space-y-3">
            {["New Meeting", "Upcoming Meetings", "Invitations"].map((item) => (
              <li
                key={item}
                onClick={() => setSelectedMenu(item)}
                className={`cursor-pointer px-4 py-2 rounded-md text-[#222E48] ${
                  selectedMenu === item
                    ? "bg-[#91C81F] text-white"
                    : "hover:bg-blue-100"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-4 text-[#222E48]">{selectedMenu}</h1>
          <div className="bg-[#91C81F] rounded-lg shadow p-4">{renderContent()}</div>
        </main>

        {/* Notifications Bar */}
        <aside className="w-72 bg-white p-4 shadow-md border-l border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-[#222E48]">
            🔔 Notifications
          </h2>
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="bg-gray-70 border rounded-md p-3 hover:bg-[#91C81F] transition text-[#222E48]"

              >
                {n.message}
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
};

export default Home;
