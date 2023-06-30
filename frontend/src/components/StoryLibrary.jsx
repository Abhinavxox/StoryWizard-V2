import React, { useState } from "react";

const StoryLibrary = () => {
  const [stories, setStories] = useState([1, 2, 3, 4, 5, 6]);
  return (
    <>
      <div className="col-span-3 bg-gray-700 rounded-lg h-full w-full m-5">
        <div className="col-span-3 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-full text-white px-5">
          {stories?.map((story) => (
            <StoryCard
              key="1"
              id="1"
              heading="heading"
              imgSrc="img"
              content="content"
            ></StoryCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default StoryLibrary;
