
import React from "react";

interface OnlineIndicatorProps {
  status: "online" | "offline" | "away";
}

export const OnlineIndicator: React.FC<OnlineIndicatorProps> = ({ status }) => {
  let bgColor = "bg-gray-400"; // Offline
  
  if (status === "online") {
    bgColor = "bg-green-500";
  } else if (status === "away") {
    bgColor = "bg-yellow-500";
  }
  
  return (
    <span 
      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${bgColor} border-2 border-background`}
      aria-label={`Status: ${status}`}
    />
  );
};
