import React from "react";

const StoryCard = ({ heading, content, imgSrc }) => {
  return (
    <div className="p-4 w rounded-lg overflow-hidden group">
      <div className="relative transition-all duration-500 ease-in-out transform group-hover:scale-110">
        <img
          src={imgSrc}
          className="w-full h-64 rounded-t-lg "
          alt={heading}
          draggable="false"
        />
        <div className="w-full bottom-0 rounded-b-lg bg-gray-600 bg-opacity-10 p-5">
          <h2 className="text-2xl p-1 font-bold">{heading}</h2>
          <p className="p-2 truncate line-clamp-3">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
