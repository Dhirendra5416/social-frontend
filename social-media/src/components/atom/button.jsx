import React from "react";

export const PrimaryButton = ({label,onClick}) => {
  return (
    <div>
      {" "}
      <button
        type="submit"
        onClick={onClick}
        className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
       {label}
      </button>
    </div>
  );
};

export const IconButton = ({ icon, onClick, label }) => (
  <button
      onClick={onClick}
      className="flex items-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      aria-label={label}
  >
      {icon}
      <span className="ml-2 text-sm">{label}</span>
  </button>
);