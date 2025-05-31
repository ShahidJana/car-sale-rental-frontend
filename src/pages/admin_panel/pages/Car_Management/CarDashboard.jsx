import React from 'react';
import { Outlet } from 'react-router-dom';

function CarDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 font-urbanist">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default CarDashboard;