import React, { useState } from "react";
import { FaPlay, FaPause, FaQuestion, FaTimes } from "react-icons/fa";

const MediaBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered((prev) => !prev);
  };

  return (
    <div
      className={`relative ${
        isHovered ? "w-48 h-14" : "w-14 h-14"
      } rounded-full cursor-pointer overflow-hidden transition-all`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full flex justify-between items-center ${
          isHovered ? "animate-expand-height" : "animate-shrink-height"
        }`}
      >
        {isHovered ? (
          <>
            <button className="w-14 h-14 bg-base-300 text-white rounded-full">
              <div className="flex justify-center">
                <FaPlay />
              </div>
            </button>
            <button className="w-14 h-14 bg-base-300 text-white rounded-full">
              <div className="flex justify-center">
                <FaPause />
              </div>
            </button>
            <button className="w-14 h-14 bg-base-300 text-white rounded-full">
              <div className="flex justify-center">
                <FaQuestion />
              </div>
            </button>
          </>
        ) : (
          <button className="w-14 h-14 bg-base-300 text-white rounded-full">
            <div className="flex justify-center">
              <FaTimes />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default MediaBar;
