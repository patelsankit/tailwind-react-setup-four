import React from "react";

const StatusBadge = ({ status }) => {
  const statusColor = {
    active: "bg-green-500",
    pending: "bg-yellow-500",
    inactive: "bg-red-800",
  };
  return (
    <span
      className={`inline-block px-3 py-1 text-white text-sm rounded-full ${
        statusColor[status] || "bg-gray-500"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
