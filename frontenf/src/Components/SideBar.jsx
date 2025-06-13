// components/Sidebar.jsx
import React from "react";

const Sidebar = ({ selectedTab, onSelectTab }) => {
  const tabs = ["Dashboard", "Meetings", "Notifications", "Settings"];

  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`p-2 rounded cursor-pointer mb-2 ${
              selectedTab === tab ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => onSelectTab(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
