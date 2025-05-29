import React, { useState } from "react";

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("New Meeting");

  const renderContent = () => {
    switch (selectedMenu) {
      case "New Meeting":
        return <p className="text-lg">📅 Schedule a New Meeting</p>;
      case "Upcoming Meetings":
        return <p className="text-lg">📆 List of Upcoming Meetings</p>;
      case "Invitations":
        return <p className="text-lg">✉️ Your Meeting Invitations</p>;
      default:
        return <p>Select a menu item</p>;
    }
  };

  const notifications = [
    { id: 1, message: 'You have been invited to "Team Sync"' },
    { id: 2, message: '"Project Review" meeting updated' },
    { id: 3, message: '"Client Demo" starts in 30 minutes' },
  ];

  return (
    <main className=" relative top-15 flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold mb-6 text-blue-600">
          Meeting Scheduler
        </h2>
        <ul className="space-y-3">
          {["New Meeting", "Upcoming Meetings", "Invitations"].map((item) => (
            <li
              key={item}
              onClick={() => setSelectedMenu(item)}
              className={`cursor-pointer px-4 py-2 rounded-md ${
                selectedMenu === item
                  ? "bg-blue-500 text-white"
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
        <h1 className="text-2xl font-semibold mb-4">{selectedMenu}</h1>
        <div className="bg-white rounded-lg shadow p-4">{renderContent()}</div>
      </main>

      {/* Notifications Bar */}
      <aside className="w-72 bg-white p-4 shadow-md border-l border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          🔔 Notifications
        </h2>
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="bg-gray-50 border rounded-md p-3 hover:bg-gray-100 transition"
            >
              {n.message}
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
};

export default Home;
