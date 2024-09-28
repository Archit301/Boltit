// components/Notification.js

import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa'; // Importing a bell icon
import { useSelector } from 'react-redux';

const Notification = () => {
  const [notifications, setNotifications] = useState('');
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/backend/notification/get/${currentUser._id}`); 
        const data = await response.json();
        console.log(data)
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);


  useEffect(() => {
    const markread = async () => {
        // Replace with your actual API endpoint
        const response = await fetch(`/backend/notification/unread/${currentUser._id}`); 
        const data = await response.json();
        console.log(data)
     
    };
    markread ();
  }, []);

  return (
    <div className="w-full lg:max-w-4xl mx-auto p-6 lg:p-8 bg-white rounded-lg shadow-lg mt-5  lg:pt-1">
  <div className="flex items-center mb-4">
    <FaBell className="h-6 w-6 text-blue-600" />
    <h2 className="ml-2 text-xl font-semibold text-gray-800">Notifications</h2>
  </div>
  {loading ? (
    <div className="text-center text-gray-500">
      <p>Loading...</p>
    </div>
  ) : notifications.length === 0 ? (
    <div className="text-center text-gray-500">
      <p>No notifications</p>
    </div>
  ) : (
    <ul className="space-y-3">
      {notifications.map((notification, index) => (
        <li
          key={index}
          className="p-4 bg-blue-50 rounded-lg shadow-md hover:bg-blue-100 transition duration-200"
        >
          <p className="text-sm text-gray-700">{notification.message}</p>
          <span className="text-xs text-gray-500">
            {new Date(notification.createdAt).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  )}
</div>
  
  );
};

export default Notification;
