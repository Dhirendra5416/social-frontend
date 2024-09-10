// src/Pages/NotFound.js
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Page Not Found</p>
      </div>
    </div>
  );
};

export default NotFound;
