// Dashboard.js
import React from 'react';
import BorrowedItemsList from './BorrowedItemsList';
import LentItemsList from './LentItemsList';
import PendingRequests from './PendingRequests';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6 lg:p-10">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center lg:text-left">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Borrowed Items Section */}
        <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Borrowed Items</h2>
          <BorrowedItemsList />
        </div>

        {/* Lent Items Section */}
        <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Lent Items</h2>
          <LentItemsList />
        </div>

        {/* Pending Requests Section */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-4">Pending Requests</h2>
          <PendingRequests />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
