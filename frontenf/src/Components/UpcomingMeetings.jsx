import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UpcomingMeetings() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios
      .get(`http://localhost:8080/api/notifications/upcoming-meetings/${userId}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Fetched notifications:", response.data);
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        toast.error("Something went wrong while fetching notifications");
      });
  }, []);

  const updateStatus = ({ notificationId, status }) => {
    axios
      .put(`http://localhost:8080/api/notifications/respond/${notificationId}?status=${status}`)
      .then((response) => {
        toast.success(response.data);

        // Remove the responded notification from list
        setNotifications((prev) =>
          prev.filter((notif) => notif.notificationId !== notificationId)
        );
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        toast.error("Failed to update invitation status");
      });
  };

  return (
    <div className="text-lg text-[#222E48] w-[80%]">
      {notifications.length === 0 ? (
        <p>
          No Notifications{" "}
          <span className="text-red-500">refresh this page</span>
        </p>
      ) : (
        notifications.map((notification) => (
          <div key={notification.notificationId}>
            <div className="bg-white shadow-lg rounded-xl p-5 mb-4 border border-gray-200">
              <div className="mb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {notification.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {notification.description}
                </p>
              </div>

              <div className="text-sm text-gray-700 mt-3">
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {notification.date}
                </p>
                <p>
                  <span className="font-medium">Start Time:</span>{" "}
                  {notification.startTime}
                </p>
                <p>
                  <span className="font-medium">End Time:</span>{" "}
                  {notification.endTime}
                </p>
              </div>

              {notification.status === "PENDING" && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() =>
                      updateStatus({
                        notificationId: notification.notificationId,
                        status: "ACCEPTED",
                      })
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      updateStatus({
                        notificationId: notification.notificationId,
                        status: "REJECTED",
                      })
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UpcomingMeetings;
